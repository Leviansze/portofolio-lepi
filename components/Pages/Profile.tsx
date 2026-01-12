"use client";

import Image from "next/image";
import { 
  FaGithub, FaLinkedin, FaServer, FaHdd, 
  FaMicrochip, FaBolt, FaHistory, FaMoneyBillWave, FaGamepad 
} from "react-icons/fa";
import { Button } from "../ui/button";

export function Profile() {
  const techStack = [
    "Laravel", "React", "Next.js", "Tailwind", 
    "Docker", "TrueNAS", "Cloudflared", "Linux", "FastPanel", "Git"
  ];

  const serverSpecs = [
    { label: "Brain", value: "Dual Xeon E5 (Silicon Muscle)", icon: <FaMicrochip /> },
    { label: "Storage", value: "30x Screaming HDDs", icon: <FaHdd /> },
    { label: "Power", value: "Meter Spinnin' Like DJ", icon: <FaBolt /> },
  ];

  const changelog = [
    {
      ver: "v2023.10 (Current)",
      role: "Sensei / Code Guru",
      loc: "SMK Purnawarman",
      desc: "Installing Knowledge.exe to students. Debugging human errors. Compiling future devs.",
    },
    {
      ver: "v2024.1 (Current)",
      role: "Dungeon Master (Lab Tech)",
      loc: "SMK Purnawarman",
      desc: "Guarded the Silicon Sanctuary. Upgraded hardware stats. Prevented students from rm -rf /.",
    },
    {
      ver: "v2024.10",
      role: "Pixel Pusher & Logic Bender",
      loc: "Wako GmbH/Remote",
      desc: "Crafted Meshify & AIDDDO. Converted caffeine into deployable code.",
    },
    {
      ver: "v????.??",
      role: "Mercenary for Hire",
      loc: "The Internet",
      desc: "Will code for server parts. Sleep is optional, Uptime is mandatory.",
    }
  ];

  const projects = [
    { 
      title: "PROJECT: DATA_HOARDER", 
      desc: "Dell R730 Beast. 30 Drives. Sounds like jet engine. Stores the Matrix.", 
      hp: "99% UP",
      color: "bg-yellow-200 dark:bg-yellow-900 dark:text-white"
    },
    { 
      title: "GATEWAY_FOR_KIDS", 
      desc: "Free hosting via Cloudflare Tunnels. Because localhos is lonely.", 
      hp: "85% UP",
      color: "bg-blue-200 dark:bg-blue-900 dark:text-white"
    },
    { 
      title: "MINDSET_PATCH_V1", 
      desc: "Stoicism.exe running. Handling production crashes without tears.", 
      hp: "LOADING...",
      color: "bg-red-200 dark:bg-red-900 dark:text-white"
    }
  ];

  return (
    <div className="relative w-full mx-auto font-mono">
      <div className="absolute right-0 top-0 -z-10 opacity-20 dark:opacity-10 pointer-events-none">
         <div className="w-64 h-64 bg-yellow-400 border-4 border-black rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
         <div className="w-64 h-64 bg-purple-400 border-4 border-black rounded-full mix-blend-multiply filter blur-2xl -ml-20 -mt-20 animate-blob animation-delay-2000"></div>
         <div className="w-64 h-64 bg-pink-400 border-4 border-black rounded-full mix-blend-multiply filter blur-2xl -ml-10 mt-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex flex-col gap-8 border-4 border-black bg-white p-6 shadow-[6px_6px_0_0_#000] dark:border-white dark:bg-zinc-900 dark:shadow-[6px_6px_0_0_#fff] lg:flex-row lg:items-stretch lg:p-10">
        
        <div className="flex flex-col gap-6 shrink-0 w-full lg:w-1/3">
          
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-black dark:bg-white translate-x-2 translate-y-2 border-2 border-black dark:border-white -z-10"></div>
            <div className="border-2 border-black dark:border-white bg-white p-2 dark:bg-zinc-800">
              <Image
                src="/PhotoProfile.png" 
                alt="Rico Eriansyah"
                width={400}
                height={400}
                className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 border border-black dark:border-white"
              />
              <div className="mt-2 text-center font-black text-lg bg-yellow-400 text-black border-y-2 border-black dark:border-white py-1 uppercase tracking-tighter">
                Lvl. ??? Technomancer
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-red-500 text-white border-2 border-black dark:border-white px-3 py-2 text-sm font-bold shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] rotate-[10deg] animate-pulse">
              DEPLOY READY
            </div>
          </div>

          <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0_0_#000] dark:bg-zinc-800 dark:border-white dark:shadow-[4px_4px_0_0_#fff]">
            <h3 className="font-black text-sm uppercase mb-3 flex items-center gap-2 border-b-2 border-black dark:border-white pb-2 text-black dark:text-white">
              <FaServer /> RIG_STATS.JSON
            </h3>
            <ul className="space-y-3">
              {serverSpecs.map((spec, i) => (
                <li key={i} className="flex items-center justify-between text-xs md:text-sm font-bold">
                   <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">{spec.icon} {spec.label}</span>
                   <span className="bg-black text-white px-2 py-0.5 dark:bg-white dark:text-black">{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-100 dark:bg-green-900 border-4 border-black dark:border-white p-4 shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff] text-black dark:text-white">
             <div className="flex justify-between items-center mb-1">
                <span className="font-black text-sm flex items-center gap-2"><FaMoneyBillWave /> LOOT TARGET</span>
                <span className="font-bold text-xs">100M IDR</span>
             </div>
             <div className="w-full bg-white dark:bg-zinc-800 border-2 border-black dark:border-white h-4 rounded-none relative">
                <div className="bg-green-500 h-full w-[15%] absolute top-0 left-0 border-r-2 border-black dark:border-white animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-black dark:text-white">GRINDING...</div>
             </div>
             <p className="text-[10px] mt-1 font-bold text-center italic">&quot;One commit at a time.&quot;</p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-6">
          
          <div className="border-b-4 border-black dark:border-white pb-6 border-dashed">
            <h1 className="text-5xl md:text-7xl font-black uppercase text-black dark:text-white leading-[0.8] tracking-tighter">
              RICO <br/>
              <span className="text-transparent bg-clip-text bg-blue-600">ERIANSYAH</span>
            </h1>
            <div className="flex flex-wrap gap-3 mt-4">
               <span className="bg-green-400 text-black border-2 border-black dark:border-white px-3 py-1 font-bold text-sm shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff] transform -rotate-2">
                 TEACHER 👨‍🏫
               </span>
               <span className="bg-blue-400 text-black border-2 border-black dark:border-white px-3 py-1 font-bold text-sm shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff] transform rotate-1">
                 FULLSTACK 💻
               </span>
               <span className="bg-red-400 text-black border-2 border-black dark:border-white px-3 py-1 font-bold text-sm shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff] transform -rotate-1">
                 DEVOPS ⚙️
               </span>
            </div>
          </div>

          <article className="mt-8 relative bg-white dark:bg-zinc-800 border-2 border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]">
            <div className="bg-blue-600 dark:bg-blue-900 p-2 border-b-2 border-black dark:border-white flex items-center justify-between">
               <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
                 <FaServer /> root@rico-server:~
               </span>
               <div className="flex gap-2">
                 <div className="w-3 h-3 bg-red-500 border border-black dark:border-white"></div>
                 <div className="w-3 h-3 bg-yellow-400 border border-black dark:border-white"></div>
                 <div className="w-3 h-3 bg-green-500 border border-black dark:border-white"></div>
               </div>
            </div>

            <div className="p-6">
              <p className="text-base md:text-lg text-black dark:text-white font-medium leading-relaxed">
                <span className="font-bold bg-yellow-300 text-black px-1 mr-1"> $ whoami </span>
                <br/>
                Me Rico. Day time: Me teach small humans how to code. Night time: Me retreat to Man-Cave (HomeLab).
                <br/><br/>
                Me like expensive server parts. Me try to be Stoic, but broken production make me sad inside. Currently trying to run AI Brain locally because Cloud is expensive.
              </p>

              <div className="mt-6">
                <h4 className="font-bold text-sm uppercase mb-3 underline decoration-wavy decoration-red-500 text-black dark:text-white">Weapon Inventory:</h4>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <span 
                      key={index} 
                      className={`
                        px-3 py-1 text-sm font-bold border-2 border-black dark:border-white shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff]
                        ${index % 2 === 0 
                            ? 'bg-red-200 text-black dark:bg-red-900 dark:text-white hover:bg-red-300 dark:hover:bg-red-800' 
                            : 'bg-blue-200 text-black dark:bg-blue-900 dark:text-white hover:bg-blue-300 dark:hover:bg-blue-800'}
                        hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] dark:hover:shadow-[4px_4px_0_0_#fff] transition-all cursor-default
                      `}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <div>
             <h4 className="font-black text-xl uppercase mb-4 flex items-center gap-2 text-black dark:text-white">
                <FaHistory /> PATCH NOTES (HISTORY)
             </h4>
             <div className="space-y-3">
                {changelog.map((log, i) => (
                   <div key={i} className="flex items-start gap-3 bg-white dark:bg-zinc-900 p-3 border-2 border-black dark:border-white shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff] hover:translate-x-1 transition-transform">
                      <span className="shrink-0 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-2 py-1 mt-1">{log.ver}</span>
                      <div>
                         <h5 className="font-black text-sm uppercase text-black dark:text-white">{log.role} <span className="text-gray-500">@{log.loc}</span></h5>
                         <p className="text-sm leading-tight text-gray-700 dark:text-gray-300">{log.desc}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <div>
             <h4 className="font-black text-xl uppercase mb-4 flex items-center gap-2 text-black dark:text-white">
                <FaGamepad /> CURRENT SIDE QUESTS
             </h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((quest, idx) => (
                   <div key={idx} className={`${quest.color} border-2 border-black dark:border-white p-4 shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] dark:hover:shadow-[6px_6px_0_0_#fff] transition-all`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-black border border-black dark:border-white bg-white dark:bg-zinc-800 dark:text-white px-1">ACTIVE</span>
                        <span className="text-xs font-bold opacity-80">{quest.hp}</span>
                      </div>
                      <h5 className="font-black text-lg leading-tight mb-1">{quest.title}</h5>
                      <p className="text-sm font-medium leading-tight opacity-80 mb-3">{quest.desc}</p>
                      <div className="w-full bg-white dark:bg-zinc-800 border border-black dark:border-white h-2 rounded-full overflow-hidden">
                          <div className="bg-black dark:bg-white h-full animate-pulse" style={{ width: "85%" }}></div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <div>
             <h4 className="font-black text-xl uppercase mb-4 underline decoration-wavy decoration-blue-500 text-black dark:text-white">
                SKILL MATRIX
             </h4>
             <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                <span 
                    key={index} 
                    className="px-3 py-1 font-bold border-2 border-black dark:border-white bg-white dark:bg-zinc-900 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-help"
                >
                    [{tech}]
                </span>
                ))}
            </div>
          </div>

          <div className="flex gap-4 mt-4 pt-4 border-t-2 border-black dark:border-white">
            <Button className="flex-1 bg-black text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300 border-2 border-black dark:border-white shadow-[4px_4px_0_0_#888] dark:shadow-[4px_4px_0_0_#fff] h-12 text-lg font-bold rounded-md" asChild>
                <a href="https://github.com/ricoerian" target="_blank">
                  <FaGithub className="mr-2" /> GITHUB
                </a>
            </Button>
            <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700 border-2 border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] h-12 text-lg font-bold rounded-md" asChild>
              <a href="https://www.linkedin.com/in/rico-eriansyah-6729a8204/" target="_blank">
                <FaLinkedin className="mr-2" /> LINKEDIN
              </a>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}