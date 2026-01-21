"use client";

import { useMemo } from "react";
import { MascotStatus, Direction } from "../types";
import { IMAGES } from "../constants";

interface UseSpeakiVisualsProps {
    status: MascotStatus;
    isHolding: boolean;
    direction: Direction;
    isFlipped: boolean;
    walkDuration: number;
}

export function useSpeakiVisuals({ status, isHolding, direction, isFlipped, walkDuration }: UseSpeakiVisualsProps) {
    const visuals = useMemo(() => {
        let currentImage = IMAGES.NORMAL;
        let transitionClass = "";
        let pScaleX = 1.1;
        let pScaleY = 1.1;
        let pRotate = 0;
        let isBounceAnim = false;
        let imageClass = "";

        switch (status) {
            case 'WALKING':
                currentImage = IMAGES.NORMAL;
                transitionClass = isHolding ? "transition-none" : `transition-all ease-linear`;
                isBounceAnim = !isHolding;
                break;
            case 'INTERACTING':
                currentImage = IMAGES.TALK;
                transitionClass = "transition-transform duration-200 cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                pScaleX = 1.2; pScaleY = 0.8;
                break;
            case 'DRAGGING':
                currentImage = IMAGES.DRAG;
                transitionClass = "transition-none";
                break;
            case 'FALLING':
                currentImage = IMAGES.DRAG;
                transitionClass = "transition-all duration-500 ease-in";
                break;
            case 'LANDING':
                currentImage = IMAGES.DROP;
                transitionClass = "transition-transform duration-200";
                pScaleX = 1.3; pScaleY = 0.6;
                break;
            case 'SLEEPING':
                currentImage = IMAGES.SLEEP;
                transitionClass = "transition-all duration-500";
                pScaleX = 1.05; pScaleY = 1.05;
                imageClass = "animate-pulse";
                break;
            case 'BONKED':
                currentImage = IMAGES.BONK;
                transitionClass = "transition-transform duration-100";
                pScaleX = 0.8; pScaleY = 1.2;
                break;
            case 'POINTING':
                currentImage = IMAGES.POINT;
                transitionClass = "transition-all duration-300";
                break;
            case 'CLIMBING':
                currentImage = IMAGES.NORMAL;
                transitionClass = "transition-all ease-linear";
                pRotate = direction === 'RIGHT' ? -90 : 90;
                isBounceAnim = true;
                break;
        }

        const flipScale = isFlipped ? -1 : 1;
        let transformStyle = `scaleX(${flipScale * pScaleX}) scaleY(${pScaleY})`;
        if (pRotate !== 0) {
            transformStyle = `rotate(${pRotate}deg) scale(${pScaleX})`;
        }

        const invScaleX = 1 / pScaleX;
        const invScaleY = 1 / pScaleY;
        const bubbleFlipCorrection = isFlipped ? -1 : 1;
        const bubbleTransformStyle = `rotate(${-pRotate}deg) scale(${invScaleX * bubbleFlipCorrection}, ${invScaleY})`;

        const containerStyle: React.CSSProperties = {
            transformOrigin: "bottom center",
            transform: transformStyle,
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "none",
            willChange: status === 'DRAGGING' ? 'top, left' : 'transform',
            zIndex: 9999,
            transitionDuration: (status === 'WALKING' || status === 'CLIMBING') && !isHolding ? `${walkDuration}ms` : undefined
        };

        if (isBounceAnim) {
            imageClass = `${imageClass} animate-bounce-walk`;
        }

        return {
            currentImage,
            transitionClass,
            containerStyle,
            bubbleTransformStyle,
            imageClass
        };
    }, [status, isHolding, direction, isFlipped, walkDuration]);

    return visuals;
}
