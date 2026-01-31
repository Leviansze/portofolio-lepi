"use client";

import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward } from "react-icons/fa";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const PLAYLIST = [
    {
        title: "Kata Mereka Ini Berlebihan - Pop Punk Cover",
        url: "https://www.youtube.com/watch?v=A0901RCL7hQ"
    },
    {
        title: "Satu Bulan - Bernadya (Pop Punk Cover)",
        url: "https://www.youtube.com/watch?v=aucjLTTC-18"
    }
];

export default function MusicPlayer() {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(0.6);
    const [isMuted, setIsMuted] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [showControls, setShowControls] = useState(false);

    const currentSong = PLAYLIST[currentSongIndex];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const nextSong = () => {
        setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
        setIsPlaying(true);
    };

    const prevSong = () => {
        setCurrentSongIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
        setIsPlaying(true);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(e.target.value));
        if (isMuted) setIsMuted(false);
    };

    if (!isMounted) return null;

    return (
        <div
            className="fixed bottom-8 right-8 z-[100] group flex items-center gap-4"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            {/* Elegant Glassmorphic Container & Controls */}
            <div className="relative flex items-center flex-row-reverse pointer-events-auto">

                {/* Main Interaction Button */}
                <div className="relative z-20">
                    {/* Outer Glow/Ring */}
                    {isPlaying && (
                        <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-400/10 animate-ping pointer-events-none scale-125"></div>
                    )}

                    <button
                        onClick={togglePlay}
                        className={`
                            relative w-16 h-16 rounded-full 
                            backdrop-blur-md bg-white/10 dark:bg-black/40 
                            border border-white/20 dark:border-white/10
                            shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
                            flex items-center justify-center
                            transition-all duration-500 ease-out
                            hover:scale-105 hover:bg-white/20 dark:hover:bg-white/5
                            ${!isPlaying ? 'ring-2 ring-yellow-400/50' : ''}
                        `}
                    >
                        {/* Abstract Soundwave Visualizer */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-20 transition-opacity">
                            <div className="flex gap-1 h-6 items-center">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className={`w-0.5 bg-black dark:bg-white rounded-full transition-all duration-500 ${isPlaying ? 'animate-[pulse_1.5s_ease-in-out_infinite]' : 'h-1'}`}
                                        style={{
                                            animationDelay: `${i * 0.2}s`,
                                            height: isPlaying ? '100%' : '4px'
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Icon Overlay */}
                        <div className={`
                            z-10 transition-all duration-300
                            ${isPlaying ? 'opacity-0 group-hover:opacity-100 scale-75' : 'opacity-100 scale-100'}
                            text-black dark:text-white
                        `}>
                            {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} className="translate-x-0.5" />}
                        </div>
                    </button>
                </div>

                {/* Expanded Controls Card (Glassmorphism) */}
                <div className={`
                    absolute right-1/2 mr-4 transition-all duration-700 ease-in-out
                    ${showControls ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-12 pointer-events-none'}
                `}>
                    <div className="flex flex-col gap-3 min-w-[240px] bg-black/80 dark:bg-zinc-900/90 backdrop-blur-2xl p-4 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">

                        {/* Music Name Display & Playlist Navigation */}
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-400">Now Playing</span>
                                <span className="text-[8px] font-mono text-white/40">{currentSongIndex + 1} / {PLAYLIST.length}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <button onClick={prevSong} className="text-white/40 hover:text-white transition-colors">
                                    <FaStepBackward size={12} />
                                </button>

                                <div className="flex-1 overflow-hidden whitespace-nowrap">
                                    <p className={`text-[11px] font-medium text-white ${isPlaying ? 'animate-[marquee_12s_linear_infinite]' : ''}`}>
                                        {currentSong.title} &nbsp; &bull; &nbsp; {currentSong.title}
                                    </p>
                                </div>

                                <button onClick={nextSong} className="text-white/40 hover:text-white transition-colors">
                                    <FaStepForward size={12} />
                                </button>
                            </div>
                        </div>

                        {/* Volume Control Section */}
                        <div className="flex items-center gap-3 mt-1 py-1 border-t border-white/5">
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="text-white opacity-60 hover:opacity-100 transition-opacity"
                            >
                                {isMuted || volume === 0 ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
                            </button>
                            <div className="relative flex-1 h-1.5 bg-white/10 rounded-full group/vol overflow-hidden">
                                <div
                                    className="absolute inset-y-0 left-0 bg-blue-500 transition-all duration-300"
                                    style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                                ></div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                            <span className="text-[9px] font-mono text-white/40 w-6 text-right">
                                {Math.round((isMuted ? 0 : volume) * 100)}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Audio Engine */}
            <div className="fixed -top-[1000px] -left-[1000px] w-1 h-1 overflow-hidden pointer-events-none">
                <ReactPlayer
                    src={currentSong.url}
                    playing={isPlaying}
                    volume={isMuted ? 0 : volume}
                    muted={isMuted}
                    loop={false}
                    onEnded={nextSong}
                    playsInline={true}
                    width="100%"
                    height="100%"
                />
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}
