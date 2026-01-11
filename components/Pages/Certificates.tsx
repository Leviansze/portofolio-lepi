"use client";
import { CertificateLists } from "@/components/Organisms/CertificateLists";
import { Certificates as CertificateDatas } from "@/data/CertificateDatas";

export function Certificates() {
  
  return (
    <>

      <h1 className="bg-green-500 dark:bg-green-700 text-3xl md:text-5xl font-bold text-center text-black dark:text-white border-2 border-black dark:border-white shadow-[4px_4px_0_0] p-4 lg:p-6">
        My Certificates 🎖️
      </h1>
      
      {CertificateDatas.map((certificate, index) => (
        <CertificateLists key={index} {...certificate} />
      ))}

    </>
  );
}