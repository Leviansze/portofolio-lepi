"use client";

import { ProjectLists } from "@/components/Organisms/ProjectLists";
import { Projects as ProjectDatas } from "@/data/ProjectDatas";

export function Projects() {
  return (
    <>
      <h1 className="bg-yellow-300 dark:bg-yellow-700 text-3xl md:text-5xl font-bold text-center text-black dark:text-white border-2 border-black dark:border-white shadow-[4px_4px_0_0] p-4 lg:p-6">
        My Projects 🖥️
      </h1>
      {ProjectDatas.map((project, index) => (
        <ProjectLists key={index} {...project} />
      ))}
    </>
  );
}