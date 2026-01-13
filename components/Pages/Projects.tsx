"use client";

import { ProjectLists } from "@/components/Organisms/ProjectLists";
import { Projects as ProjectDatas } from "@/data/ProjectDatas";
import { FaGamepad, FaRocket } from "react-icons/fa";

export function Projects() {
  return (
    <div className="relative w-full mx-auto py-16 font-mono overflow-hidden">
      
      <div className="absolute left-0 top-1/4 -z-10 opacity-10 pointer-events-none">
         <FaRocket className="text-[400px] text-blue-500 -rotate-12" />
      </div>

      <div className="flex justify-center mb-20 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-black dark:bg-white -z-10 border-t-2 border-b-2 border-black dark:border-white border-dashed"></div>

        <div className="relative inline-block group">
          <div className="absolute top-2 left-2 w-full h-full bg-black dark:bg-white -z-10"></div>
          
          <h1 className="flex items-center gap-4 bg-yellow-400 text-3xl md:text-5xl font-black uppercase text-black border-4 border-black dark:border-white px-10 py-6 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300 shadow-[8px_8px_0_0_#fff] dark:shadow-[8px_8px_0_0_#222]">
            <FaGamepad className="text-4xl animate-bounce" />
            MISSION LOG
          </h1>
          
          <div className="absolute -bottom-4 -right-6 bg-red-500 text-white border-2 border-black dark:border-white px-3 py-1 font-bold text-xs rotate-3 animate-pulse">
              DEPLOYED_APPS
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-16 px-4 mx-auto">
        {ProjectDatas.map((project, index) => (
          <ProjectLists key={index} {...project} index={index} />
        ))}
      </div>
    </div>
  );
}