"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin, FaServer } from "react-icons/fa";

export function Profile() {
  const techStack = [
    "Laravel", "React", "Next.js", "Tailwind", 
    "Docker", "TrueNAS", "Cloudflared", "Linux"
  ];

  return (
    <div className="relative w-full mx-auto p-4">
      <div className="absolute right-0 top-0 -z-10 opacity-20 dark:opacity-10">
         <div className="w-32 h-32 bg-yellow-400 border-2 border-black rounded-full mix-blend-multiply filter blur-xl"></div>
         <div className="w-32 h-32 bg-purple-400 border-2 border-black rounded-full mix-blend-multiply filter blur-xl -ml-10 -mt-10"></div>
      </div>

      <div className="flex flex-col items-center gap-8 border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000] dark:border-white dark:bg-zinc-900 dark:shadow-[8px_8px_0_0_#fff] lg:flex-row lg:items-start lg:gap-12 lg:p-10">
        
        <div className="relative shrink-0 group">
          <div className="absolute inset-0 bg-yellow-400 translate-x-3 translate-y-3 border-2 border-black -z-10 rounded-none"></div>
          <div className="border-2 border-black bg-white p-2">
            <Image
              src="/PhotoProfile.png" 
              alt="Rico Eriansyah"
              width={400}
              height={400}
              className="w-64 md:w-[350px] lg:w-[380px] object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <div className="mt-2 text-center font-mono font-bold text-sm bg-black text-white py-1">
              PROFILE_RICO_ERIANSYAH.PNG
            </div>
          </div>
          
          <div className="absolute -top-4 -left-4 bg-green-500 border-2 border-black px-4 py-1 text-xs font-bold shadow-[4px_4px_0_0_#000] rotate-[-5deg]">
            AVAILABLE FOR HIRE
          </div>
        </div>

        <div className="flex flex-col w-full">
          
          <h1 className="text-4xl md:text-6xl font-black uppercase text-black dark:text-white leading-tight">
            Rico <span className="text-transparent bg-clip-text bg-blue-600">Eriansyah</span>
          </h1>
          <p className="text-lg md:text-xl font-mono mt-2 font-bold text-gray-600 dark:text-gray-300">
            Full-Stack Engineer & Educator
          </p>

          <article className="mt-8 relative bg-white dark:bg-zinc-800 border-2 border-black dark:border-white">
            <div className="bg-blue-600 dark:bg-blue-800 p-2 border-b-2 border-black dark:border-white flex items-center justify-between">
               <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
                 <FaServer /> root@rico-server:~
               </span>
               <div className="flex gap-2">
                 <div className="w-3 h-3 bg-red-500 border border-black"></div>
                 <div className="w-3 h-3 bg-yellow-400 border border-black"></div>
                 <div className="w-3 h-3 bg-green-500 border border-black"></div>
               </div>
            </div>

            <div className="p-6">
              <p className="text-base md:text-lg text-black dark:text-white font-medium leading-relaxed">
                <span className="font-bold bg-yellow-300 dark:text-black px-1">Teacher by day, DevOps by night.</span> I specialize in building robust applications using Laravel & React, backed by deep expertise in infrastructure (TrueNAS, Docker). Currently creating local AI solutions and managing homelabs.
              </p>

              <div className="mt-6">
                <h4 className="font-bold text-sm uppercase mb-3 underline decoration-wavy decoration-red-500">Tech Arsenal:</h4>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <span 
                      key={index} 
                      className={`
                        px-3 py-1 text-sm font-bold border-2 border-black dark:border-white shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff]
                        ${index % 2 === 0 ? 'bg-red-200 text-black hover:bg-red-300' : 'bg-blue-200 text-black hover:bg-blue-300'}
                        hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all cursor-default
                      `}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-bold border-2 border-black dark:border-white shadow-[4px_4px_0_0_#888] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-zinc-800 transition-all">
              <FaGithub className="text-xl" /> GitHub
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-black dark:bg-zinc-900 dark:text-white font-bold border-2 border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] hover:bg-yellow-300 dark:hover:bg-yellow-600 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
              <FaLinkedin className="text-xl" /> LinkedIn
            </button>
            <div className="ml-auto hidden md:block rotate-3">
               <span className="text-sm font-handwriting font-bold bg-white border border-black p-1">Let&apos;s Collab! 🚀</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}