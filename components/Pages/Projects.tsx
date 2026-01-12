"use client";

import { ProjectLists } from "@/components/Organisms/ProjectLists";
import { Projects as ProjectDatas } from "@/data/ProjectDatas";

export function Projects() {
  return (
    <div className="w-full mx-auto py-12">
      <div className="relative mb-16 text-center">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] h-full bg-black dark:bg-white -z-10 skew-x-[-10deg]"></div>
        <h1 className="inline-block bg-yellow-400 text-4xl md:text-6xl font-black uppercase text-black border-4 border-black px-8 py-4 shadow-[8px_8px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_#000] transition-all">
          My Projects 🚀
        </h1>
      </div>
      
      <div className="flex flex-col gap-12">
        {ProjectDatas.map((project, index) => (
          <ProjectLists key={index} {...project} />
        ))}
      </div>
    </div>
  );
}