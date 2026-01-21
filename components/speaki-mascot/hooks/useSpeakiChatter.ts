"use client";

import { useState, useCallback, useRef } from "react";

export function useSpeakiChatter() {
    const [speechText, setSpeechText] = useState<string | null>(null);
    const [emoteIcon, setEmoteIcon] = useState<string | null>(null);

    const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const emoteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showSpeech = useCallback((text: string, duration = 2000) => {
        setSpeechText(text);
        if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
        speechTimeoutRef.current = setTimeout(() => setSpeechText(null), duration);
    }, []);

    const showEmote = useCallback((icon: string, duration = 1500) => {
        setEmoteIcon(icon);
        if (emoteTimeoutRef.current) clearTimeout(emoteTimeoutRef.current);
        emoteTimeoutRef.current = setTimeout(() => setEmoteIcon(null), duration);
    }, []);

    return {
        speechText,
        emoteIcon,
        showSpeech,
        showEmote
    };
}
