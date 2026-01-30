import React, { useState, useContext, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Spin, message, Badge, Button } from 'antd';
import { PlayCircleFilled, PauseCircleFilled, DeleteOutlined, HeartFilled } from '@ant-design/icons';
import { PlayerContext } from '../Context/PlayerContext';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    // Global Player Context
    const { playTrack, currentTrack, isPlaying } = useContext(PlayerContext);

    // Fetch Favorites
    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            // Use axiosInstance - auth header handled automatically
            const { data } = await axiosInstance.get('/playlist');
            setFavorites(data || []);
        } catch (error) {
            console.error("Error fetching favorites:", error);
            message.error("Failed to load favorites");
        } finally {
            setLoading(false);
        }
    };

    // Remove Handler (Optimistic UI)
    const removeFavorite = async (e, trackId) => {
        e.stopPropagation(); // Stop click from triggering player

        // 1. Optimistic Update: Remove from UI immediately
        const previousFavorites = [...favorites];
        setFavorites(favorites.filter(t => String(t.id) !== String(trackId)));

        try {
            await axiosInstance.delete(`/playlist/${trackId}`);
            message.success("Removed from favorites");
        } catch (error) {
            console.error("Remove Error:", error);
            // Revert state if error
            setFavorites(previousFavorites);
            message.error("Failed to remove favorite");
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-4 md:p-10 font-sans pb-32">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                        Your Favorites
                    </h1>
                    <p className="text-red-500 text-lg">Your personal collection of top tracks</p>
                </header>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col justify-center items-center mt-20">
                        <Spin size="large" />
                        <p className="mt-4 text-gray-400">Loading your collection...</p>
                    </div>
                )}

                {/* Tracks Grid */}
                {!loading && favorites.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {favorites.map(track => {
                            const isCurrentTrack = String(currentTrack?.id) === String(track.id);
                            const isTrackPlaying = isCurrentTrack && isPlaying;

                            return (
                                <div
                                    key={track.id}
                                    className={`bg-neutral-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-neutral-800 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl border ${isCurrentTrack ? 'border-red-500' : 'border-transparent'} hover:border-red-500/30 flex flex-col cursor-pointer relative`}
                                    onClick={() => playTrack(track)}
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-square w-full">
                                        {track.album_image ? (
                                            <img
                                                className="w-full h-full object-cover"
                                                src={track.album_image}
                                                alt={track.name}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-neutral-700 flex items-center justify-center text-gray-500">
                                                No Image
                                            </div>
                                        )}

                                        {/* Play Overlay */}
                                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${isTrackPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                            {isTrackPlaying ? (
                                                <PauseCircleFilled style={{ fontSize: '50px', color: '#dc2626' }} />
                                            ) : (
                                                <PlayCircleFilled style={{ fontSize: '50px', color: '#dc2626' }} />
                                            )}
                                        </div>

                                        <div className="absolute top-2 right-2">
                                            <Badge count={<HeartFilled style={{ color: '#dc2626' }} />} style={{ backgroundColor: 'transparent' }} />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-5 flex flex-col flex-grow justify-between">
                                        <div className="mb-4">
                                            <div className="flex justify-between items-start">
                                                <h3 className={`font-bold text-lg truncate mb-1 flex-1 ${isCurrentTrack ? 'text-red-500' : 'text-white'}`} title={track.name}>
                                                    {track.name}
                                                </h3>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={(e) => removeFavorite(e, track.id)}
                                                    className="ml-2 text-gray-500 hover:text-red-500 transform hover:scale-110 transition-all"
                                                    title="Remove from favorites"
                                                >
                                                    <DeleteOutlined className="text-lg" />
                                                </button>
                                            </div>
                                            <p className="text-gray-400 truncate text-sm font-medium">
                                                {track.artist_name}
                                            </p>
                                        </div>

                                        {/* Basic details */}
                                        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
                                            <span>Duration: {Math.floor(track.duration / 60)}:{('0' + (track.duration % 60)).slice(-2)}</span>
                                            {isCurrentTrack && <span className="text-red-500 animate-pulse">Now Playing</span>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Empty State */}
                {!loading && favorites.length === 0 && (
                    <div className="flex flex-col items-center justify-center mt-20 text-center">
                        <div className="bg-neutral-800 p-8 rounded-full mb-6">
                            <HeartFilled className="text-6xl text-neutral-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
                        <p className="text-gray-400 mb-6">Start listening and like songs to save them here.</p>
                        <Link to="/music">
                            <Button type="primary" size="large" className="bg-red-600 hover:bg-red-500 border-none h-12 px-8 rounded-full font-bold">
                                Find Music
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
