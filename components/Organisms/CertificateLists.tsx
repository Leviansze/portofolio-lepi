"use client";

import Image from "next/image";
import { CertificateProps } from "@/type/CertificateType";
import { FaExternalLinkAlt, FaCertificate, FaBarcode, FaCheckCircle } from "react-icons/fa";

export const CertificateLists = ({ 
  title, 
  description, 
  imageSrc, 
  imageWidth, 
  imageHeight, 
  certificateLink 
}: CertificateProps) => {

    const handleCertificateClick = () => {
        window.open(certificateLink, '_blank');
    };

    const fakeId = `CERT-${title.length}X-88`; 

    return (
      <div 
        onClick={handleCertificateClick}
        className="group relative cursor-pointer w-full transition-all duration-300 hover:-translate-y-2"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black dark:bg-white translate-x-3 translate-y-3 lg:translate-x-4 lg:translate-y-4 rounded-none -z-10 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6"></div>
        
        <div className="flex flex-col lg:flex-row border-4 border-black dark:border-white bg-white dark:bg-zinc-900 overflow-hidden">
          
          <div className="relative shrink-0 w-full lg:w-[400px] border-b-4 lg:border-b-0 lg:border-r-4 border-black dark:border-white bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center p-8 overflow-hidden">
            
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

            <div className="relative shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff] border-4 border-black dark:border-white bg-white transform group-hover:rotate-2 transition-transform duration-500">
                <Image
                    src={imageSrc}
                    alt={title}
                    width={imageWidth}
                    height={imageHeight}
                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full border-2 border-black dark:border-white flex items-center justify-center animate-spin-slow">
                    <FaCertificate className="text-xl text-black" />
                </div>
            </div>

            <div className="absolute top-4 left-4 bg-green-500 text-white border-2 border-black dark:border-white px-2 py-1 text-[10px] font-bold shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff] flex items-center gap-1">
                <FaCheckCircle /> AUTH_KEY_VALID
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 lg:p-8 w-full relative">
             
             <div className="absolute top-0 right-0 bg-red-500 w-16 h-16 flex items-center justify-center border-l-4 border-b-4 border-black dark:border-white">
                <span className="text-white font-black text-xs -rotate-45">RANK S</span>
             </div>

             <div>
                <div className="flex justify-between items-start gap-4 mb-2 mt-4 lg:mt-0">
                    <div className="bg-purple-300 border-2 border-black dark:border-white px-3 py-1 text-xs font-black uppercase inline-block shadow-[3px_3px_0_0_#000] dark:shadow-[3px_3px_0_0_#fff] flex items-center gap-2 text-black">
                         ITEM_CLASS: SCROLL
                    </div>
                </div>

                <h3 className="text-2xl lg:text-3xl font-black uppercase text-black dark:text-white leading-[0.9] mb-4 mt-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {title}
                </h3>

                <div className="bg-zinc-100 dark:bg-zinc-800 border-2 border-black dark:border-white p-3 relative font-mono text-sm text-zinc-700 dark:text-zinc-300">
                    <span className="absolute -top-2 left-3 bg-white dark:bg-black px-1 text-[10px] font-bold border border-black dark:border-white text-gray-500">DESCRIPTION</span>
                    <span className="text-green-600 font-bold mr-2">&gt;</span>
                    {description}
                </div>
             </div>

             <div className="mt-8 flex items-center justify-between border-t-2 border-dashed border-black dark:border-white pt-4">
                 <div className="flex items-center gap-1 opacity-50 text-black dark:text-white">
                    <FaBarcode className="text-3xl" />
                    <span className="text-[10px] font-mono">ID: {fakeId}</span>
                 </div>

                 <div className="flex items-center gap-2 text-sm font-bold uppercase bg-black dark:bg-white text-white dark:text-black px-4 py-2 hover:bg-yellow-400 hover:text-black border-2 border-black dark:border-white transition-all shadow-[4px_4px_0_0_#888] dark:shadow-[4px_4px_0_0_#fff] active:translate-y-1 active:shadow-none">
                    <FaExternalLinkAlt />
                    INSPECT ITEM
                 </div>
             </div>
          </div>
        </div>
      </div>
    );
}