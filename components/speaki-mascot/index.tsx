"use client";

import React from "react";
import Image from "next/image";
import { useSpeakiLogic } from "./hooks/useSpeakiLogic";
import { useSpeakiVisuals } from "./hooks/useSpeakiVisuals";
import { SpeakiBubble } from "./components/SpeakiBubble";

export default function SpeakiMascot() {
    const { state, chatter, mascotRef, handleStart } = useSpeakiLogic();

    const {
        currentImage,
        transitionClass,
        containerStyle,
        bubbleTransformStyle,
        imageClass
    } = useSpeakiVisuals({
        status: state.status,
        isHolding: state.isHolding,
        direction: state.direction,
        isFlipped: state.isFlipped,
        walkDuration: state.walkDuration
    });

    if (!state.position) return null;

    return (
        <div
            ref={mascotRef}
            onMouseDown={(e) => { e.preventDefault(); handleStart(e.clientX, e.clientY); }}
            onTouchStart={(e) => { if (e.touches.length > 0) handleStart(e.touches[0].clientX, e.touches[0].clientY); }}
            className={`fixed z-50 cursor-grab active:cursor-grabbing ${transitionClass}`}
            style={{
                ...containerStyle,
                top: `${state.position.top}px`,
                left: `${state.position.left}px`,
            }}
        >
            <SpeakiBubble
                speechText={chatter.speechText}
                emoteIcon={chatter.emoteIcon}
                bubbleTransformStyle={bubbleTransformStyle}
            />

            <Image
                src={currentImage}
                alt="Speaki Mascot"
                width={90}
                height={90}
                className={`pointer-events-none select-none ${imageClass}`}
                draggable={false}
                priority
            />
        </div>
    );
}
