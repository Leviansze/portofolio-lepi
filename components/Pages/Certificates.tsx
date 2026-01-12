"use client";

import { CertificateLists } from "@/components/Organisms/CertificateLists";
import { Certificates as CertificateDatas } from "@/data/CertificateDatas";
import { FaAward, FaTrophy } from "react-icons/fa";

export function Certificates() {
  return (
    <div className="relative w-full mx-auto py-16 font-mono overflow-hidden">
      
      <div className="absolute right-0 top-1/4 -z-10 opacity-10 pointer-events-none">
         <FaAward className="text-[400px] text-yellow-500 rotate-12" />
      </div>

      <div className="flex justify-center mb-20 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-black dark:bg-white -z-10 border-t-2 border-b-2 border-black dark:border-white border-dashed"></div>

        <div className="relative inline-block group">
          <div className="absolute top-2 left-2 w-full h-full bg-black dark:bg-white -z-10"></div>
          
          <h1 className="flex items-center gap-3 bg-green-400 text-3xl md:text-5xl font-black uppercase text-black border-4 border-black dark:border-white px-10 py-6 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300 shadow-[8px_8px_0_0_#fff] dark:shadow-[8px_8px_0_0_#222]">
            <FaTrophy className="text-4xl animate-bounce" />
            ACHIEVEMENTS
          </h1>
          
          <div className="absolute -bottom-4 -right-6 bg-yellow-400 border-2 border-black dark:border-white px-3 py-1 font-bold text-xs rotate-3 animate-pulse text-black">
             XP_BOOSTers
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-10 px-4 mx-auto">
        {CertificateDatas.map((certificate, index) => (
          <CertificateLists key={index} {...certificate} />
        ))}
      </div>
    </div>
  );
}