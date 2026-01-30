import React, { createContext, useState, useRef, useEffect } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);

    // Provide the audio element reference to be used by the BottomPlayer
    const audioRef = useRef(null);

    const playTrack = (track) => {
        // If it's the same track, just toggle play
        if (currentTrack?.id === track.id) {
            togglePlay();
            return;
        }

        // New track
        setCurrentTrack(track);
        setIsPlaying(true);
        // Audio auto-play is handled in the BottomPlayer component via useEffect or ref interaction
        // However, modern browsers block autoplay unless triggered by user interaction.
        // Since playTrack is called from a click handler, we can try to play immediately after state update or let the component handle it.
    };

    const togglePlay = () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            resumeTrack();
        }
    };

    const pauseTrack = () => {
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const resumeTrack = () => {
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.error("Playback failed:", e));
        }
    };

    const handleVolumeChange = (val) => {
        setVolume(val);
        if (audioRef.current) {
            audioRef.current.volume = val;
        }
        if (val > 0 && isMuted) setIsMuted(false);
    };

    return (
        <PlayerContext.Provider value={{
            currentTrack,
            isPlaying,
            playTrack,
            pauseTrack,
            resumeTrack,
            togglePlay,
            volume,
            setVolume: handleVolumeChange,
            audioRef,
            setIsPlaying // Exposed for event listeners in BottomPlayer
        }}>
            {children}
        </PlayerContext.Provider>
    );
};
