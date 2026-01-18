"use client";

import { FaSkull, FaExclamationTriangle } from "react-icons/fa";

interface SecurityWarningModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function SecurityWarningModal({ onConfirm, onCancel }: SecurityWarningModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-300">
       <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000,#000_20px,#111_20px,#111_40px)] opacity-50 -z-10"></div>
       
       <div className="bg-yellow-400 dark:bg-yellow-600 border-8 border-black dark:border-white p-8 md:p-12 max-w-xl w-full shadow-[20px_20px_0_0_#fff] dark:shadow-[20px_20px_0_0_#000] relative transform -rotate-2">
        
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-6 py-2 font-mono font-bold border-2 border-white dark:border-black uppercase tracking-widest shadow-[4px_4px_0_0_#ff0000]">
           <FaExclamationTriangle className="inline-block mr-2 mb-1" /> Security Alert
        </div>

        <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 text-black dark:text-white text-center leading-[0.9] tracking-tighter">
          DO NOT<br/><span className="text-red-600 dark:text-red-400">PROCEED</span>
        </h2>
        
        <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white p-6 mb-8 font-mono font-bold text-lg text-black dark:text-white shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff]">
          <p className="mb-4">You are about to execute a dangerous function.</p>
          <ul className="list-disc pl-5 space-y-1 text-red-600 dark:text-red-400 uppercase">
            <li>System instability risk</li>
            <li>Visual & Audio Hazard</li>
            <li>No turning back</li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={onConfirm}
            className="w-full bg-black dark:bg-zinc-900 border-4 border-black dark:border-white text-red-500 font-black text-2xl py-5 uppercase shadow-[8px_8px_0_0_#ff0000] hover:bg-red-600 hover:text-black dark:hover:text-white hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <FaSkull /> I ACCEPT THE RISK
          </button>
          <button
            onClick={onCancel}
            className="w-full bg-white dark:bg-zinc-200 border-4 border-black dark:border-white text-black font-black text-xl py-4 uppercase shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff] hover:bg-gray-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all cursor-pointer"
          >
            Cancel (Safe Mode)
          </button>
        </div>
      </div>
    </div>
  );
}