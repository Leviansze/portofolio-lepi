"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ProjectProps } from "@/type/ProjectType";
import { FaGithub, FaExternalLinkAlt, FaCode, FaTerminal, FaInstagram } from "react-icons/fa";

interface ExtendedProjectProps extends ProjectProps {
    index?: number;
}

export const ProjectLists = ({
    title,
    techStack,
    description,
    liveDemoLink,
    sourceCodeLink,
    imageSrc,
    imageWidth,
    imageHeight,
    index = 0
}: ExtendedProjectProps) => {
    const isEven = index % 2 === 0;

    return (
        <div className={`group flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-8 lg:gap-12 w-full mx-auto`}>

            {/* LEFT: TERMINAL WINDOW */}
            <div className="w-full lg:w-1/2 shrink-0 perspective-1000">
                <div className="h-full border-4 border-black dark:border-white bg-zinc-800 shadow-[12px_12px_0_0_#000] dark:shadow-[12px_12px_0_0_#fff] flex flex-col transition-transform duration-300 hover:scale-[1.01]">

                    {/* Window Bar */}
                    <div className="flex items-center gap-2 border-b-4 border-black dark:border-white bg-zinc-200 dark:bg-zinc-800 p-3">
                        <div className="flex gap-2">
                            <div className="h-4 w-4 rounded-full border-2 border-black bg-red-500 hover:bg-red-400"></div>
                            <div className="h-4 w-4 rounded-full border-2 border-black bg-yellow-400 hover:bg-yellow-300"></div>
                            <div className="h-4 w-4 rounded-full border-2 border-black bg-green-500 hover:bg-green-400"></div>
                        </div>
                        <div className="ml-4 flex-1 rounded-sm border-2 border-black dark:border-gray-500 bg-white dark:bg-black px-2 py-0.5 text-xs font-mono font-bold text-gray-500 dark:text-gray-300 truncate">
                            localhost/projects/{title.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                        </div>
                    </div>

                    <div className="relative flex-1 overflow-hidden bg-zinc-900 group-hover:bg-zinc-800 transition-colors p-2">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20"></div>

                        <div className="relative w-full h-full border-2 border-black dark:border-white overflow-hidden">
                            <Image
                                src={imageSrc}
                                alt={title}
                                width={imageWidth}
                                height={imageHeight}
                                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: CONTENT */}
            <div className="w-full lg:w-1/2 flex flex-col">
                <article className="relative h-full flex flex-col border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-6 lg:p-8 shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff]">

                    <div className={`absolute -top-5 ${isEven ? '-right-4' : '-left-4'} rotate-2 border-2 border-black dark:border-white bg-blue-500 px-4 py-1 font-black text-white text-sm shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] uppercase`}>
                        Quest_ID_0{index + 1}
                    </div>

                    <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400 font-mono text-xs font-bold uppercase">
                        <FaTerminal /> project_manifest.json
                    </div>

                    <h2 className="mb-4 text-2xl sm:text-3xl md:text-5xl font-black uppercase leading-none text-black dark:text-white tracking-tighter">
                        {title}
                    </h2>

                    <div className="mb-6 flex-1 bg-zinc-100 dark:bg-zinc-800 border-2 border-black dark:border-white p-3 sm:p-4 font-mono text-xs sm:text-sm md:text-base text-zinc-800 dark:text-zinc-300 shadow-[4px_4px_0_0_#ccc] dark:shadow-none relative">
                        <span className="absolute -top-3 left-4 bg-white dark:bg-black px-2 text-[10px] sm:text-xs font-bold border border-black dark:border-white text-red-500">BRIEFING</span>
                        <p>{description}</p>
                    </div>

                    <div className="mb-8">
                        <div className="mb-3 flex items-center gap-2">
                            <FaCode className="text-lg sm:text-xl text-black dark:text-white" />
                            <span className="text-[10px] sm:text-sm font-black uppercase underline decoration-wavy decoration-yellow-400 text-black dark:text-white">Equipped Gear (Tech):</span>
                        </div>
                        <p className="font-bold text-black dark:text-white text-sm sm:text-base md:text-lg leading-snug font-mono flex flex-wrap gap-2">
                            {techStack.split(',').map((tech, i) => (
                                <span key={i} className="inline-block bg-yellow-200 dark:bg-yellow-600 dark:text-white text-black border border-black dark:border-white px-2 py-1 text-[10px] sm:text-xs shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff]">
                                    {tech.trim()}
                                </span>
                            ))}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        <Button
                            asChild
                            className="flex-1 rounded-md border-2 border-black dark:border-white bg-black dark:bg-zinc-100 px-4 py-6 sm:px-6 text-base sm:text-lg font-bold text-white dark:text-black shadow-[4px_4px_0_0_#888] dark:shadow-[4px_4px_0_0_#fff] transition-all hover:translate-y-[-2px] hover:bg-zinc-800 dark:hover:bg-zinc-300 active:translate-y-0"
                        >
                            <a href={liveDemoLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                <FaExternalLinkAlt /> VISIT WEB
                            </a>
                        </Button>
                        <Button
                            asChild
                            className="flex-1 rounded-md border-2 border-black dark:border-white bg-white dark:bg-zinc-900 px-4 py-6 sm:px-6 text-base sm:text-lg font-bold text-black dark:text-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] transition-all hover:translate-y-[-2px] hover:bg-yellow-300 dark:hover:bg-yellow-600 active:translate-y-0"
                        >
                            <a href={sourceCodeLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                <FaInstagram /> SOSMED
                            </a>
                        </Button>
                    </div>
                </article>
            </div>
        </div>
    );
}