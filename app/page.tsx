"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { Profile } from "@/components/Pages/Profile";
import { Projects } from "@/components/Pages/Projects";
import { Certificates } from "@/components/Pages/Certificates";
import { ContactAndSocialMedia } from "@/components/Pages/ContactAndSocialMedia";
import { FaSkull, FaExclamationTriangle } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ChaosOverlay = dynamic(() => import("@/components/ChaosOverlay"), {
  ssr: false,
});

function MainContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "Profile";
  const [showWarning, setShowWarning] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white font-mono transition-colors duration-300">
      
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {chaosMode && (
        <ChaosOverlay onClose={() => setChaosMode(false)} />
      )}

      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
           <div className="bg-yellow-400 dark:bg-yellow-600 border-4 border-black dark:border-white p-8 max-w-lg w-full shadow-[10px_10px_0_0_#000]">
            <div className="flex items-center gap-2 font-bold text-2xl mb-4 uppercase">
               <FaExclamationTriangle /> Security Alert
            </div>
            <p className="font-bold mb-6 text-lg">
              Execute dangerous script? This may cause visual distortions and audio playback.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setShowWarning(false); setChaosMode(true); }}
                className="w-full bg-black text-red-500 font-bold py-3 uppercase hover:bg-red-600 hover:text-black transition-colors"
              >
                <FaSkull className="inline mr-2"/> I ACCEPT THE RISK
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="w-full bg-white text-black font-bold py-3 uppercase border-2 border-black hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="relative z-10 px-4 py-6 md:px-8 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 border-b-4 border-black dark:border-white pb-6 bg-white dark:bg-zinc-900">
          
          <ul className="flex flex-wrap justify-center gap-3 w-full lg:w-auto">
            {[
              { id: "Profile", label: "Profile" },
              { id: "Projects", label: "Projects" },
              { id: "Certificates", label: "Certificates" },
              { id: "ContactAndSocialMedia", label: "Contact" },
            ].map((item) => (
              <li key={item.id}>
                <Link
                  href={item.id === "Profile" ? "/" : `/?tab=${item.id}`}
                  scroll={false}
                  className={`
                    block border-2 border-black dark:border-white px-4 py-2 font-bold uppercase
                    transition-all
                    ${currentTab === item.id 
                      ? "bg-black text-white dark:bg-white dark:text-black translate-x-1 translate-y-1 shadow-none" 
                      : "bg-white dark:bg-zinc-800 shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000]"
                    }
                  `} 
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="px-6 py-2 bg-red-600 text-white font-black uppercase border-2 border-black shadow-[4px_4px_0_0_#000] hover:bg-red-700 animate-pulse"
            onClick={() => setShowWarning(true)}
          >
            <FaSkull className="inline mr-2" /> Don&apos;t Click
          </button>
        </div>
      </nav>

      <main className="px-4 py-8 md:px-8 max-w-7xl mx-auto min-h-[60vh]">
        {currentTab === "Profile" && <Profile />}
        {currentTab === "Projects" && <Projects />}
        {currentTab === "Certificates" && <Certificates />}
        {currentTab === "ContactAndSocialMedia" && <ContactAndSocialMedia />}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 font-mono">
        LOADING SYSTEM...
      </div>
    }>
      <MainContent />
    </Suspense>
  );
}