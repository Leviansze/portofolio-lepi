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
    "Docker", "TrueNAS", "Cloudflared", "Linux", "Proxmox", "Git"
  ];

  const serverSpecs = [
    { label: "Brain", value: "Dual Xeon E5 v4", icon: <FaMicrochip /> },
    { label: "Storage", value: "30x Spinny Bois", icon: <FaHdd /> },
    { label: "Power", value: "Stonks 📈", icon: <FaBolt /> },
  ];

  const changelog = [
    {
      ver: "v2023.10",
      role: "Sensei / Teacher",
      loc: "SMK Purnawarman",
      desc: "Spawn new dev generation. Fix syntax error. Repeat.",
    },
    {
      ver: "v2024.1",
      role: "Head Laboratory Technician",
      loc: "SMK Purnawarman",
      desc: "Manage team. Wear tie. Present PowerPoint.",
    },
    {
      ver: "v2024.10",
      role: "Front-endy Code Wiz, Me Do!",
      loc: "Wako GmbH/Remote",
      desc: "Build WorkshopApp. Exchange sleep for money.",
    },
    {
      ver: "v????.??",
      role: "Freelance Mercenary",
      loc: "Freelance/Remote",
      desc: "Build Web App. Exchange sleep for money.",
    }
  ];

  const projects = [
    { 
      title: "THE BEAST (NAS)", 
      desc: "Dell R730. Loud fans. Store internet.", 
      hp: "100%",
      color: "bg-yellow-200"
    },
    { 
      title: "Student Hosting", 
      desc: "Free hosting via Cloudflare Tunnel.", 
      hp: "85%",
      color: "bg-blue-200"
    },
    { 
      title: "Stoic Mindset", 
      desc: "Read books. No panic when server crash.", 
      hp: "50%",
      color: "bg-red-200"
    }
  ];

  return (
    <div className="relative w-full mx-auto font-mono">
      <div className="absolute right-0 top-0 -z-10 opacity-20 dark:opacity-10 pointer-events-none">
         <div className="w-64 h-64 bg-yellow-400 border-4 border-black rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
         <div className="w-64 h-64 bg-purple-400 border-4 border-black rounded-full mix-blend-multiply filter blur-2xl -ml-20 -mt-20 animate-blob animation-delay-2000"></div>
         <div className="w-64 h-64 bg-pink-400 border-4 border-black rounded-full mix-blend-multiply filter blur-2xl -ml-10 mt-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex flex-col gap-8 border-4 border-black bg-white p-6 shadow-[4px_4px_0_0_#000] dark:border-white dark:bg-zinc-900 dark:shadow-[10px_10px_0_0_#fff] lg:flex-row lg:items-stretch lg:p-10">
        
        <div className="flex flex-col gap-6 shrink-0 w-full lg:w-1/3">
          
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 border-2 border-black -z-10"></div>
            <div className="border-2 border-black bg-white p-2 dark:bg-zinc-800">
              <Image
                src="/PhotoProfile.png" 
                alt="Rico Eriansyah"
                width={400}
                height={400}
                className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 border border-black"
              />
              <div className="mt-2 text-center font-black text-lg bg-yellow-400 text-black border-y-2 border-black py-1 uppercase tracking-tighter">
                Lvl. ??? Technomancer
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-red-500 text-white border-2 border-black px-3 py-2 text-sm font-bold shadow-[4px_4px_0_0_#000] rotate-[10deg] animate-pulse">
              NO SLEEP!
            </div>
          </div>

          <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0_0_#000] dark:bg-zinc-800 dark:border-white dark:shadow-[4px_4px_0_0_#fff]">
            <h3 className="font-black text-sm uppercase mb-3 flex items-center gap-2 border-b-2 border-black dark:border-white pb-2">
              <FaServer /> HOME_LAB.CONF
            </h3>
            <ul className="space-y-3">
              {serverSpecs.map((spec, i) => (
                <li key={i} className="flex items-center justify-between text-xs md:text-sm font-bold">
                   <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">{spec.icon} {spec.label}</span>
                   <span className="bg-black text-white px-2 py-0.5 dark:bg-white dark:text-black">{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-100 border-4 border-black p-4 shadow-[8px_8px_0_0_#000]">
             <div className="flex justify-between items-center mb-1">
                <span className="font-black text-sm flex items-center gap-2"><FaMoneyBillWave /> LOOT GOAL</span>
                <span className="font-bold text-xs">??? IDR</span>
             </div>
             <div className="w-full bg-white border-2 border-black h-4 rounded-none relative">
                <div className="bg-green-500 h-full w-[15%] absolute top-0 left-0 border-r-2 border-black"></div>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">LOADING...</div>
             </div>
             <p className="text-[10px] mt-1 font-bold text-center italic">&quot;Grind never stops&quot;</p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-6">
          
          <div className="border-b-4 border-black dark:border-white pb-6 border-dashed">
            <h1 className="text-5xl md:text-7xl font-black uppercase text-black dark:text-white leading-[0.8] tracking-tighter">
              RICO <br/>
              <span className="text-transparent bg-clip-text bg-blue-600">ERIANSYAH</span>
            </h1>
            <div className="flex flex-wrap gap-3 mt-4">
               <span className="bg-green-400 border-2 border-black px-3 py-1 font-bold text-sm shadow-[2px_2px_0_0_#000] transform -rotate-2">
                 TEACHER 👨‍🏫
               </span>
               <span className="bg-blue-400 border-2 border-black px-3 py-1 font-bold text-sm shadow-[2px_2px_0_0_#000] transform rotate-1">
                 FULLSTACK 💻
               </span>
               <span className="bg-red-400 border-2 border-black px-3 py-1 font-bold text-sm shadow-[2px_2px_0_0_#000] transform -rotate-1">
                 DEVOPS ⚙️
               </span>
            </div>
          </div>

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
                <span className="font-bold bg-yellow-300 dark:text-black px-1"> Me teach kids how computer go beep-boop.</span>
                When sun down, me go to cave (homelab) and touch servers. Me spend money on server parts. Me try to be Stoic but bugs make me cry inside. Currently building AI brain at home because cloud too expensive.
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

          <div>
             <h4 className="font-black text-xl uppercase mb-4 flex items-center gap-2">
                <FaHistory /> Changelog / History
             </h4>
             <div className="space-y-3">
                {changelog.map((log, i) => (
                   <div key={i} className="flex items-start gap-3 bg-white dark:bg-zinc-900 p-3 border-2 border-black shadow-[2px_2px_0_0_#000]">
                      <span className="shrink-0 bg-black text-white text-xs font-bold px-2 py-1 mt-1">{log.ver}</span>
                      <div>
                         <h5 className="font-black text-sm uppercase">{log.role} <span className="text-gray-500">@{log.loc}</span></h5>
                         <p className="text-sm leading-tight text-gray-700 dark:text-gray-300">{log.desc}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <div>
             <h4 className="font-black text-xl uppercase mb-4 flex items-center gap-2">
                <FaGamepad /> Active Quests
             </h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((quest, idx) => (
                   <div key={idx} className={`${quest.color} border-2 border-black p-4 shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] transition-all`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-black border border-black bg-white px-1">IN PROGRESS</span>
                        <span className="text-xs font-bold text-gray-700">{quest.hp} HP</span>
                      </div>
                      <h5 className="font-black text-lg leading-tight mb-1">{quest.title}</h5>
                      <p className="text-sm font-medium leading-tight opacity-80 mb-3">{quest.desc}</p>
                      <div className="w-full bg-white border border-black h-2 rounded-full overflow-hidden">
                          <div className="bg-black h-full" style={{ width: quest.hp }}></div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <div>
             <h4 className="font-black text-xl uppercase mb-4 underline decoration-wavy decoration-blue-500">
                Skill Inventory
             </h4>
             <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                <span 
                    key={index} 
                    className="px-3 py-1 font-bold border-2 border-black dark:border-white bg-white dark:bg-zinc-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-help"
                >
                    [{tech}]
                </span>
                ))}
            </div>
          </div>

          <div className="flex gap-4 mt-4 pt-4 border-t-2 border-black dark:border-white">
            <Button className="flex-1 bg-black text-white hover:bg-zinc-800 border-2 border-black shadow-[4px_4px_0_0_#888] h-12 text-lg font-bold rounded-md" asChild>
                <a href="https://github.com/ricoerian" target="_blank">
                  <FaGithub className="mr-2" /> GITHUB
                </a>
            </Button>
            <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700 border-2 border-black shadow-[4px_4px_0_0_#000] h-12 text-lg font-bold rounded-md" asChild>
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