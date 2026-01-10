"use client";

import { useState } from "react";
import { Profile } from "@/components/Pages/Profile";
import { Projects } from "@/components/Pages/Projects";
import { Certificates } from "@/components/Pages/Certificates";
import { ContactAndSocialMedia } from "@/components/Pages/ContactAndSocialMedia";
  
export default function Home() {
  const [Tab, setTab] = useState("Profile");
  return (
    <>
      <nav className="p-4 md:p-8">
        <ul className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
          
          <span className="flex flex-col md:flex-row gap-4 lg:space-x-8 text-center w-full lg:w-auto">
            <li>
              <a
                className="block border-2 border-black dark:border-white px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0 transition-all cursor-pointer"
                onClick={setTab.bind(null, "Profile")}
              >
                Profile
              </a>
            </li>
            <li>
              <a
                className="block border-2 border-black dark:border-white px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0 transition-all cursor-pointer"
                onClick={setTab.bind(null, "Projects")}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                className="block border-2 border-black dark:border-white px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0 transition-all cursor-pointer"
                onClick={setTab.bind(null, "Certificates")}
              >
                Certificates
              </a>
            </li>
            <li>
              <a
                className="block border-2 border-black dark:border-white px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0 transition-all cursor-pointer"
                onClick={setTab.bind(null, "ContactAndSocialMedia")}
              >
                Contact & Social Media
              </a>
            </li>
          </span>

          <li className="w-full lg:w-auto text-center">
            <a
              className="inline-block border-2 border-black dark:border-white bg-red-500 px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-red-300 focus:outline-0 transition-all cursor-pointer"
              href="#"
            >
              💀 Don&apos;t Click Me
            </a>
          </li>
        </ul>
      </nav>

      <main className="h-full">
        {Tab === "Profile" && <Profile />}
        {Tab === "Projects" && <Projects />}
        {Tab === "Certificates" && <Certificates />}
        {Tab === "ContactAndSocialMedia" && <ContactAndSocialMedia />}
      </main>
    </>
  );
}