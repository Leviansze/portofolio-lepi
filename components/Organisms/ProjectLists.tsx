"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ProjectProps } from "@/type/ProjectType";

export const ProjectLists = ({ 
  title, 
  techStack, 
  description, 
  liveDemoLink, 
  sourceCodeLink, 
  imageSrc, 
  imageWidth, 
  imageHeight 
}: ProjectProps) => {
    return (
        <div className="group flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 w-full">
            <div className="w-full lg:w-1/2 shrink-0">
                <div className="h-full border-4 border-black dark:border-white bg-white dark:bg-zinc-900 shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff] flex flex-col">
                    <div className="flex items-center gap-2 border-b-4 border-black dark:border-white bg-purple-500 p-3">
                        <div className="h-4 w-4 rounded-full border-2 border-black bg-red-500"></div>
                        <div className="h-4 w-4 rounded-full border-2 border-black bg-yellow-400"></div>
                        <div className="h-4 w-4 rounded-full border-2 border-black bg-green-500"></div>
                        <div className="ml-2 h-4 flex-1 rounded-sm border-2 border-black bg-white opacity-50"></div>
                    </div>
                    <div className="relative flex-1 overflow-hidden p-4 bg-zinc-100 dark:bg-zinc-800">
                        <Image
                            src={imageSrc}
                            alt={title}
                            width={imageWidth}
                            height={imageHeight}
                            className="h-full w-full border-2 border-black dark:border-white object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                        />
                    </div>
                </div>
            </div>
        
            <div className="w-full lg:w-1/2 flex flex-col">
                <article className="relative h-full flex flex-col border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-6 shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff]">
                    <div className="absolute -right-3 -top-3 rotate-3 border-2 border-black bg-green-400 px-3 py-1 font-bold text-black shadow-[2px_2px_0_0_#000]">
                        PROJECT
                    </div>

                    <h2 className="mb-4 text-3xl font-black uppercase leading-none text-black dark:text-white md:text-5xl">
                        {title}
                    </h2>

                    <div className="mb-6 flex-1 border-l-4 border-yellow-400 bg-zinc-50 dark:bg-zinc-800 p-4 font-mono text-base text-zinc-800 dark:text-zinc-200">
                        <p>{description}</p>
                    </div>

                    <div className="mb-6">
                        <div className="mb-2 inline-block border-2 border-black bg-blue-300 px-2 py-0.5 text-xs font-bold uppercase text-black">
                            Tech Stack
                        </div>
                        <p className="font-bold text-black dark:text-white text-lg">
                            {techStack}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-auto">
                        <Button
                            asChild
                            className="flex-1 rounded-none border-2 border-black bg-black px-6 py-6 text-lg font-bold text-white shadow-[4px_4px_0_0_#888] transition-all hover:-translate-y-1 hover:bg-zinc-800 hover:shadow-[6px_6px_0_0_#888] active:translate-x-0 active:translate-y-0 active:shadow-none dark:bg-white dark:text-black"
                        >
                            <a href={liveDemoLink} target="_blank" rel="noopener noreferrer">
                                Live Demo
                            </a>
                        </Button>
                        <Button
                            asChild
                            className="flex-1 rounded-none border-2 border-black bg-white px-6 py-6 text-lg font-bold text-black shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-[6px_6px_0_0_#000] active:translate-x-0 active:translate-y-0 active:shadow-none dark:shadow-[4px_4px_0_0_#fff] dark:hover:shadow-[6px_6px_0_0_#fff]"
                        >
                            <a href={sourceCodeLink} target="_blank" rel="noopener noreferrer">
                                Source Code
                            </a>
                        </Button>
                    </div>
                </article>
            </div>
        </div>
    );
}