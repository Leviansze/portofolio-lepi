"use client";
import { CertificateLists } from "@/components/Organisms/CertificateLists";
import { Certificates as CertificateDatas } from "@/data/CertificateDatas";
import { FaAward } from "react-icons/fa";

export function Certificates() {
  return (
    <div className="w-full mx-auto px-4 py-16">
      <div className="flex justify-center mb-16">
        <div className="relative inline-block">
          <div className="absolute top-2 left-2 w-full h-full bg-black -z-10"></div>
          <h1 className="flex items-center gap-3 bg-green-400 text-3xl md:text-5xl font-black uppercase text-black border-4 border-black px-8 py-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
            Certifications 🏅
          </h1>
        </div>
      </div>
      
      <div className="space-y-12">
        {CertificateDatas.map((certificate, index) => (
          <CertificateLists key={index} {...certificate} />
        ))}
      </div>
    </div>
  );
}