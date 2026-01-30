import React, { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../Context/PlayerContext';
import { PlayCircleFilled, PauseCircleFilled, StepBackwardOutlined, StepForwardOutlined, SoundOutlined } from '@ant-design/icons';
import { Slider } from 'antd';

const BottomPlayer = () => {
    const { currentTrack, isPlaying, togglePlay, volume, setVolume, audioRef, setIsPlaying } = useContext(PlayerContext);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (!currentTrack) return;

        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(e => console.error("Autoplay prevented:", e));
        } else if (!isPlaying && audioRef.current) {
            audioRef.current.pause();
        }
    }, [currentTrack, isPlaying, audioRef]);

    const onTimeUpdate = () => {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        }
    };

    const onEnded = () => {
        setIsPlaying(false);
        setProgress(0);
    };

    const handleSeek = (value) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setProgress(value);
        }
    };

    const formatTime = (time) => {
        if (!time) return "0:00";
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    };

    if (!currentTrack) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-neutral-800 p-4 h-24 flex items-center justify-between z-50 text-white backdrop-blur-lg">
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={currentTrack.audio}
                onTimeUpdate={onTimeUpdate}
                onEnded={onEnded}
                onLoadedMetadata={onTimeUpdate}
            />

            {/* Track Info */}
            <div className="flex items-center w-1/3 min-w-[200px]">
                {currentTrack.album_image ? (
                    <img src={currentTrack.album_image} alt="Album" className="h-14 w-14 rounded object-cover shadow-lg border border-neutral-700" />
                ) : (
                    <div className="h-14 w-14 bg-neutral-800 rounded flex items-center justify-center text-xs text-gray-500">No IMG</div>
                )}
                <div className="ml-4 truncate">
                    <h4 className="text-sm font-bold truncate hover:text-red-500 cursor-pointer transition-colors">{currentTrack.name}</h4>
                    <p className="text-xs text-gray-400 hover:text-white cursor-pointer transition-colors">{currentTrack.artist_name}</p>
                </div>
            </div>

            {/* Player Controls (Center) */}
            <div className="flex flex-col items-center w-1/3">
                <div className="flex items-center space-x-6 mb-2">
                    <StepBackwardOutlined className="text-xl text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />

                    <button onClick={togglePlay} className="transform hover:scale-110 transition-transform flex items-center justify-center" style={{ zIndex: 100 }}>
                        {isPlaying ? (
                            <PauseCircleFilled style={{ fontSize: '40px', color: '#dc2626', zIndex: 101 }} className="drop-shadow-md" />
                        ) : (
                            <PlayCircleFilled style={{ fontSize: '40px', color: '#dc2626', zIndex: 101 }} className="drop-shadow-md" />
                        )}
                    </button>

                    <StepForwardOutlined className="text-xl text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
                </div>

                {/* Progress Bar */}
                <div className="flex items-center w-full max-w-md space-x-2 text-xs text-gray-400 font-mono">
                    <span>{formatTime(progress)}</span>
                    <div className="flex-grow">
                        <Slider
                            value={progress}
                            max={duration}
                            onChange={handleSeek}
                            tooltip={{ formatter: null }}
                            trackStyle={{ backgroundColor: '#dc2626' }}
                            handleStyle={{ borderColor: '#dc2626', backgroundColor: '#fff' }}
                            railStyle={{ backgroundColor: '#404040' }}
                        />
                    </div>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume Controls (Right) */}
            <div className="flex items-center justify-end w-1/3 space-x-3">
                <SoundOutlined className="text-gray-400" />
                <div className="w-24">
                    <Slider
                        value={volume}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={setVolume}
                        trackStyle={{ backgroundColor: '#dc2626' }}
                        handleStyle={{ borderColor: '#dc2626', backgroundColor: '#fff' }}
                        railStyle={{ backgroundColor: '#404040' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BottomPlayer;
