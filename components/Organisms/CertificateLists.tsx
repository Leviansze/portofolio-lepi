"use client";

import Image from "next/image";
import { CertificateProps } from "@/type/CertificateType";
import { FaExternalLinkAlt, FaCertificate } from "react-icons/fa";

export const CertificateLists = ({ title, description, imageSrc, imageWidth, imageHeight, certificateLink }: CertificateProps) => {
    const handleCertificateClick = () => {
        window.open(certificateLink, '_blank');
    };

    return (
      <div 
        onClick={handleCertificateClick}
        className="group relative cursor-pointer w-full"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black translate-x-3 translate-y-3 lg:translate-x-4 lg:translate-y-4 rounded-none -z-10 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
        
        <div className="flex flex-col lg:flex-row border-4 border-black bg-white dark:bg-zinc-900 overflow-hidden">
          <div className="relative shrink-0 w-full lg:w-[450px] border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-zinc-100 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            <div className="relative shadow-[4px_4px_0_0_#000] border-2 border-black">
                <Image
                    src={imageSrc}
                    alt={title}
                    width={imageWidth}
                    height={imageHeight}
                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
            </div>
            <div className="absolute top-4 left-4 bg-yellow-400 border-2 border-black px-2 py-1 text-xs font-bold shadow-[2px_2px_0_0_#000]">
                VERIFIED
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 lg:p-10 w-full relative">
             <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="bg-purple-300 border-2 border-black px-3 py-1 text-sm font-bold uppercase inline-block shadow-[3px_3px_0_0_#000]">
                        Credential
                    </div>
                    <FaExternalLinkAlt className="text-2xl text-black dark:text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <h3 className="text-2xl lg:text-4xl font-black uppercase text-black dark:text-white leading-tight mb-4 group-hover:underline decoration-4 decoration-green-500 underline-offset-4">
                    {title}
                </h3>

                <p className="text-base lg:text-lg font-mono text-zinc-700 dark:text-zinc-300 border-l-4 border-zinc-300 pl-4">
                    {description}
                </p>
             </div>

             <div className="mt-8 flex items-center gap-2">
                 <div className="h-px bg-black dark:bg-white flex-1"></div>
                 <div className="flex items-center gap-2 text-sm font-bold uppercase bg-black text-white px-3 py-1 transform rotate-1">
                    <FaCertificate />
                    View Document
                 </div>
             </div>
          </div>
        </div>
      </div>
    );
}