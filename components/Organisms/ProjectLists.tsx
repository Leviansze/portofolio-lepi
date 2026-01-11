"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ProjectProps } from "@/type/ProjectType";

export const ProjectLists = ({ title, techStack, description, liveDemoLink, sourceCodeLink, imageSrc, imageWidth, imageHeight }: ProjectProps) => {
    return (
        <div className="flex flex-col lg:flex-row p-6 md:p-16 items-center lg:items-start gap-8 lg:gap-16 border-2 border-black dark:border-white shadow-[4px_4px_0_0] my-8">
            <div className="relative shrink-0">
              <Image
                src={imageSrc}
                alt={title}
                width={imageWidth}
                height={imageHeight}
                className="mask-clip-border w-72 md:w-[600px] lg:w-[600px] object-cover py-auto"
              />
            </div>
        
            <div className="flex flex-col justify-center w-full">
              <article className="border-2 border-black dark:border-white shadow-[4px_4px_0_0,8px_8px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-red-300 focus:outline-0 transition-all cursor-pointer">
                <div className="bg-yellow-300 dark:bg-yellow-700 p-3">
                  <div className="flex items-center justify-between">
                    <strong className="text-base md:text-lg font-bold uppercase text-black dark:text-white">
                        {title}
                    </strong>
                    <div className="flex gap-1">
                      <div className="size-3 border-2 border-black dark:border-white bg-yellow-700 dark:bg-yellow-500"></div>
                      <div className="size-3 border-2 border-black dark:border-white bg-red-500 dark:bg-red-700"></div>
                    </div>
                  </div>
                </div>
        
                <div className="border-t-2 border-black dark:border-white p-4 sm:p-6">
                  <p className="text-base md:text-lg text-pretty text-black dark:text-white">
                    {description}
                  </p>
                  <p className="mt-4 text-base md:text-lg text-pretty text-black dark:text-white">
                    Tech Stack : {techStack}
                  </p>

                  <div className="flex justify-end">
                    <Button
                      className="mt-4 bg-blue-500 dark:bg-blue-700 border-2 border-black dark:border-white px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0 transition-all cursor-pointer"
                      asChild
                    >
                      <a href={liveDemoLink} target="_blank" rel="noopener noreferrer">Live Demo</a>
                    </Button>
                    <Button
                      className="mt-4 ml-4 bg-green-500 dark:bg-green-700 border-2 border-black dark:border-white px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0 transition-all cursor-pointer"
                      asChild
                    >
                      <a href={sourceCodeLink} target="_blank" rel="noopener noreferrer">Source Code</a>
                    </Button>
                  </div>
                </div>
              </article>
            </div>
        </div>
    );
}