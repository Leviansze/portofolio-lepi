"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { Profile } from "@/components/Pages/Profile";
import { ContactAndSocialMedia } from "@/components/Pages/ContactAndSocialMedia";
import { Projects } from "@/components/Pages/Projects";
import { FaSkull } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SecurityWarningModal } from "@/components/Chaos/SecurityWarningModal";

const ChaosOverlay = dynamic(() => import("@/components/Chaos/ChaosOverlay"), {
  ssr: false,
});

function MainContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "Profile";
  const [showWarning, setShowWarning] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white font-mono transition-colors duration-300">

      {/* Background pattern */}
      <div
        className="fixed inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {chaosMode && <ChaosOverlay onReboot={() => setChaosMode(false)} />}

      {showWarning && (
        <SecurityWarningModal
          onConfirm={() => {
            setShowWarning(false);
            setChaosMode(true);
          }}
          onCancel={() => setShowWarning(false)}
        />
      )}

      {/* NAVBAR */}
      <nav className="relative z-10 px-4 py-6 md:px-8 mx-auto">
        <ul className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0 border-4 border-black dark:border-white p-4 lg:p-6 shadow-[6px_6px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff] bg-white dark:bg-zinc-900 transition-all">

          <span className="flex flex-col md:flex-row gap-4 lg:space-x-4 text-center w-full lg:w-auto">
            {[
              {
                id: "Profile",
                label: "Profile",
                color: "bg-blue-500 dark:bg-blue-800",
                icon: "★",
              },
              {
                id: "Projects",
                label: "Projects",
                color: "bg-yellow-400 dark:bg-yellow-600",
                icon: "🚀",
              },
              {
                id: "ContactAndSocialMedia",
                label: "Contact",
                color: "bg-pink-400 dark:bg-pink-700",
                icon: "☎",
              },
            ].map((item) => (
              <li key={item.id} className="w-full md:w-auto">
                <Link
                  href={item.id === "Profile" ? "/" : `/?tab=${item.id}`}
                  scroll={false}
                  className={`
                    ${item.color}
                    block border-2 border-black dark:border-white px-6 py-3 font-black text-black dark:text-white text-lg uppercase tracking-tight
                    shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]
                    transition-all cursor-pointer flex items-center justify-center rounded-md gap-2
                    ${currentTab === item.id
                      ? "translate-x-[2px] translate-y-[2px] shadow-none ring-2 ring-black dark:ring-white brightness-110"
                      : "hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000]"
                    }
                  `}
                >
                  {currentTab === item.id && (
                    <span className="text-xl animate-[spin_3s_linear_infinite] inline-block font-bold">
                      {item.icon}
                    </span>
                  )}

                  {item.label}

                  {currentTab === item.id && (
                    <span className="text-xl animate-[spin_3s_linear_infinite_reverse] inline-block font-bold">
                      {item.icon}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </span>

          {/* CHAOS BUTTON */}
          <li className="w-full lg:w-auto text-center mt-4 lg:mt-0">
            <button
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 border-2 border-black dark:border-white bg-red-600 px-6 py-3 font-black uppercase text-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] hover:bg-red-700 hover:rotate-2 hover:scale-105 active:scale-95 transition-all cursor-pointer tracking-widest rounded-md"
              onClick={() => setShowWarning(true)}
            >
              <FaSkull /> Don&apos;t Click Me
            </button>
          </li>
        </ul>
      </nav>

      {/* MAIN CONTENT */}
      <main className="px-4 py-2 md:px-8 md:py-4">
        {currentTab === "Profile" && <Profile />}
        {currentTab === "Projects" && <Projects />}
        {currentTab === "ContactAndSocialMedia" && <ContactAndSocialMedia />}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
      <MainContent />
    </Suspense>
  );
}
