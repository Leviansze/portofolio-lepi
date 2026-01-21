"use client";

import React from "react";

interface SpeakiBubbleProps {
    speechText: string | null;
    emoteIcon: string | null;
    bubbleTransformStyle: string;
}

export function SpeakiBubble({ speechText, emoteIcon, bubbleTransformStyle }: SpeakiBubbleProps) {
    return (
        <div style={{ transform: bubbleTransformStyle, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {speechText && (
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 font-medium border border-gray-200">
                    {speechText}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white transform rotate-45 border-r border-b border-gray-200"></div>
                </div>
            )}

            {emoteIcon && (
                <div className="absolute -top-10 right-0 text-3xl animate-bounce filter drop-shadow-sm">
                    {emoteIcon}
                </div>
            )}
        </div>
    );
}
