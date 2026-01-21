"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { MascotStatus, Direction } from "../types";
import { useSpeakiSound } from "./useSpeakiSound";
import { useSpeakiChatter } from "./useSpeakiChatter";
import { CLICK_SOUNDS, IDLE_SOUNDS, RANDOM_TALKS } from "../constants";

export function useSpeakiLogic() {
    const { playSound, setInteracted } = useSpeakiSound();
    const { speechText, emoteIcon, showSpeech, showEmote } = useSpeakiChatter();

    const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
    const [status, setStatus] = useState<MascotStatus>('WALKING');
    const [direction, setDirection] = useState<Direction>('RIGHT');
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHolding, setIsHolding] = useState(false);
    const [walkDuration, setWalkDuration] = useState(3000);

    const mascotRef = useRef<HTMLDivElement>(null);
    const initialPosRef = useRef<{ top: number; left: number } | null>(null);

    const movementTimerRef = useRef<NodeJS.Timeout | null>(null);
    const chatterTimerRef = useRef<NodeJS.Timeout | null>(null);
    const actionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const dragAngryTimerRef = useRef<NodeJS.Timeout | null>(null);

    const dragStartPos = useRef<{ x: number; y: number } | null>(null);
    const isPointerDown = useRef(false);
    const hasMoved = useRef(false);

    // Helper to get floor level
    const getFloorLevel = useCallback(() => {
        if (typeof window === "undefined") return 0;
        return window.innerHeight - 130;
    }, []);

    const startLinearWalk = useCallback(() => {
        if (typeof window === "undefined") return;

        // Safety check just in case
        if (isHolding) return;

        const padding = 60;
        const maxWidth = window.innerWidth - padding;
        const floorY = getFloorLevel();

        const targetLeft = direction === 'RIGHT' ? maxWidth : padding;

        let currentLeft = padding;
        if (mascotRef.current) {
            currentLeft = mascotRef.current.getBoundingClientRect().left;
        }

        const distance = Math.abs(targetLeft - currentLeft);
        const speed = 70;
        const duration = Math.max((distance / speed) * 1000, 1000);

        setWalkDuration(duration);
        setPosition({ top: floorY, left: targetLeft });
        setIsFlipped(direction === 'LEFT');

        if (movementTimerRef.current) clearTimeout(movementTimerRef.current);

        movementTimerRef.current = setTimeout(() => {
            // If holding, do nothing (should be cleared, but double check)
            if (isPointerDown.current) return;

            const actionRoll = Math.random();

            if (actionRoll < 0.3) {
                setStatus('CLIMBING');
                const climbHeight = 250;
                const targetTop = floorY - climbHeight;

                setWalkDuration(1500);
                setPosition({ top: targetTop, left: targetLeft });

                actionTimeoutRef.current = setTimeout(() => {
                    setStatus('FALLING');

                    const fallOffset = direction === 'RIGHT' ? -80 : 80;
                    setPosition({ top: floorY, left: targetLeft + fallOffset });

                    playSound("/sounds/uaa.mp3", true);
                    showSpeech("Waaaa!", 1000);

                    setTimeout(() => {
                        setStatus('LANDING');
                        showEmote("💫");
                        showSpeech("Aduh.", 1000);

                        setTimeout(() => {
                            setDirection(prev => prev === 'RIGHT' ? 'LEFT' : 'RIGHT');
                            setStatus('WALKING');
                        }, 2000);
                    }, 500);

                }, 1500);

            } else {
                setStatus('BONKED');
                playSound("/sounds/uaa.mp3", true);
                showEmote("💫");
                showSpeech("Aduh!", 1500);

                const bounceBack = direction === 'RIGHT' ? targetLeft - 50 : targetLeft + 50;
                setWalkDuration(200);
                setPosition({ top: floorY, left: bounceBack });

                actionTimeoutRef.current = setTimeout(() => {
                    setDirection(prev => prev === 'RIGHT' ? 'LEFT' : 'RIGHT');
                    setStatus('WALKING');
                }, 2000);
            }

        }, duration);

    }, [direction, getFloorLevel, playSound, showEmote, showSpeech, isHolding]);

    // Chatter Effect
    useEffect(() => {
        const scheduleNextChatter = () => {
            const nextTime = Math.random() * (12000 - 6000) + 6000;

            chatterTimerRef.current = setTimeout(() => {
                // Only chat if walking and not being held
                if (status === 'WALKING' && !isPointerDown.current) {
                    // We need to check if user interacted to play sound? 
                    // Using playSound safety inside useSpeakiSound handles it partially,
                    // but for random chatter, we might want reference to `hasInteractedRef` from the hook?
                    // The hook handles it: if !hasInteractedRef.current, playSound returns unless forced.

                    const dice = Math.random();

                    if (dice < 0.4) {
                        setStatus('POINTING');
                        showSpeech("Wah!", 1500);
                        setTimeout(() => setStatus('WALKING'), 2000);
                    } else {
                        showSpeech(RANDOM_TALKS[Math.floor(Math.random() * RANDOM_TALKS.length)]);
                        playSound(IDLE_SOUNDS, false);
                    }
                }
                scheduleNextChatter();
            }, nextTime);
        };

        scheduleNextChatter();

        return () => {
            if (chatterTimerRef.current) clearTimeout(chatterTimerRef.current);
        };
    }, [status, playSound, showSpeech]);

    const handleStart = useCallback((clientX: number, clientY: number) => {
        setInteracted();

        if (status === 'FALLING' || status === 'LANDING' || status === 'BONKED') return;

        setIsHolding(true);

        if (movementTimerRef.current) clearTimeout(movementTimerRef.current);
        if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
        if (dragAngryTimerRef.current) clearTimeout(dragAngryTimerRef.current);

        isPointerDown.current = true;
        hasMoved.current = false;
        dragStartPos.current = { x: clientX, y: clientY };

        if (mascotRef.current) {
            const rect = mascotRef.current.getBoundingClientRect();
            initialPosRef.current = { top: rect.top, left: rect.left };
        }

        dragAngryTimerRef.current = setTimeout(() => {
            if (isPointerDown.current && hasMoved.current) {
                showEmote("💢");
                showSpeech("Turunkan aku!", 2000);
            }
        }, 3000);

    }, [status, showEmote, showSpeech, setInteracted]);

    const handleMove = useCallback((clientX: number, clientY: number) => {
        if (!isPointerDown.current || !dragStartPos.current || !initialPosRef.current) return;

        const moveThreshold = 10;
        const deltaX = clientX - dragStartPos.current.x;
        const deltaY = clientY - dragStartPos.current.y;

        if (!hasMoved.current && (Math.abs(deltaX) > moveThreshold || Math.abs(deltaY) > moveThreshold)) {
            hasMoved.current = true;
            setStatus('DRAGGING');
            setIsHolding(true);
        }

        if (hasMoved.current) {
            const newLeft = initialPosRef.current.left + deltaX;
            const newTop = initialPosRef.current.top + deltaY;

            setPosition({ top: newTop, left: newLeft });

            if (position && newLeft < position.left) setIsFlipped(true);
            else if (position && newLeft > position.left) setIsFlipped(false);
        }
    }, [position]);

    const handleEnd = useCallback(() => {
        if (!isPointerDown.current) return;
        isPointerDown.current = false;
        setIsHolding(false);

        if (dragAngryTimerRef.current) clearTimeout(dragAngryTimerRef.current);

        if (hasMoved.current) {
            const floorY = getFloorLevel();
            if (position && position.top < floorY - 20) {
                setStatus('FALLING');
                setPosition((prev) => prev ? { ...prev, top: floorY } : null);

                playSound("/sounds/uaa.mp3", true);
                showSpeech("Aaaaaa!", 1000);

                actionTimeoutRef.current = setTimeout(() => {
                    setStatus('LANDING');
                    showEmote("💫");
                    showSpeech("Aduh.", 1000);

                    setTimeout(() => {
                        const centerX = window.innerWidth / 2;
                        const dropX = position?.left || 0;
                        setDirection(dropX < centerX ? 'RIGHT' : 'LEFT');
                        setStatus('WALKING');
                    }, 2000);
                }, 500);
            } else {
                setStatus('WALKING');
            }
        } else {
            setStatus('INTERACTING');
            playSound(CLICK_SOUNDS, true);
            showEmote("❤️");

            if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current);
            actionTimeoutRef.current = setTimeout(() => {
                setStatus('WALKING');
            }, 2500);
        }
    }, [position, getFloorLevel, playSound, showSpeech, showEmote]);

    // Global event listeners
    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            handleMove(e.clientX, e.clientY);
            if (position && (status === 'INTERACTING' || status === 'POINTING')) {
                if (e.clientX < position.left) setIsFlipped(true);
                else setIsFlipped(false);
            }
        };
        const handleGlobalMouseUp = () => handleEnd();
        const handleGlobalTouchMove = (e: TouchEvent) => {
            if (isPointerDown.current && hasMoved.current) e.preventDefault();
            if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
        };
        const handleGlobalTouchEnd = () => handleEnd();

        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
        window.addEventListener('touchend', handleGlobalTouchEnd);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('touchmove', handleGlobalTouchMove);
            window.removeEventListener('touchend', handleGlobalTouchEnd);
        };
    }, [handleMove, handleEnd, position, status]);

    // Movement loop
    useEffect(() => {
        // Only start walking if status is WALKING and NOT holding
        // AND check if we are already walking? 
        // The original code: 
        // if (status === 'WALKING' && !isHolding) { const timer = setTimeout(() => startLinearWalk(), 100); ... }

        if (status === 'WALKING' && !isHolding) {
            const timer = setTimeout(() => {
                startLinearWalk();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [status, isHolding, startLinearWalk]);

    // Initial positioning
    useEffect(() => {
        const timer = setTimeout(() => {
            const padding = 60;
            if (typeof window !== "undefined") {
                const floorY = window.innerHeight - 130;
                setPosition({ top: floorY, left: padding });
                setDirection('RIGHT');
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return {
        state: {
            position,
            status,
            direction,
            isFlipped,
            isHolding,
            walkDuration
        },
        chatter: {
            speechText,
            emoteIcon
        },
        mascotRef,
        handleStart
    };
}
