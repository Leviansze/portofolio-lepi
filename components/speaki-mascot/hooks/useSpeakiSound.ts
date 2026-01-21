"use client";

import { useRef, useCallback } from "react";

export function useSpeakiSound() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const hasInteractedRef = useRef(false);
    const lastInteractionTime = useRef<number>(Date.now());

    const playSound = useCallback((source: string[] | string, force = false) => {
        // If not forced and user hasn't interacted yet (browser policy), skip
        if (!force && !hasInteractedRef.current) return;

        // specific cooldown logic if not forced
        const timeSince = Date.now() - lastInteractionTime.current;
        if (!force && timeSince < 1500) return;

        let soundToPlay: string;
        if (Array.isArray(source)) {
            if (source.length === 0) return;
            soundToPlay = source[Math.floor(Math.random() * source.length)];
        } else {
            soundToPlay = source;
        }

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        audioRef.current = new Audio(soundToPlay);
        audioRef.current.volume = 0.6;
        audioRef.current.play().catch(() => {
            // Autoplay policy might block this if no interaction happened yet
        });

        if (force) {
            lastInteractionTime.current = Date.now();
        }
    }, []);

    const setInteracted = useCallback(() => {
        hasInteractedRef.current = true;
    }, []);

    return { playSound, setInteracted };
}
