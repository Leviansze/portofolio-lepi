"use client";

import Image from "next/image";
import { CertificateProps } from "@/type/CertificateType";

export const CertificateLists = ({ title, description, imageSrc, imageWidth, imageHeight, certificateLink }: CertificateProps) => {
    const handleCertificateClick = () => {
        window.open(certificateLink, '_blank');
    };

    return (
      <div className="flex flex-col lg:flex-row p-6 md:p-16 items-center lg:items-start gap-8 lg:gap-16 border-2 border-black dark:border-white shadow-[4px_4px_0_0] my-8">
        <div className="relative shrink-0">
          <Image
            src={imageSrc}
            alt={title}
            width={imageWidth}
            height={imageHeight}
            className="mask-clip-border w-72 md:w-[600px] lg:w-[600px] object-cover py-auto"
          />
        </div>

        <div className="flex flex-col justify-center w-full">
          <article className="border-2 border-black dark:border-white shadow-[4px_4px_0_0,8px_8px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-red-300 focus:outline-0 transition-all cursor-pointer" onClick={handleCertificateClick}>
            <div className="bg-green-500 dark:bg-green-700 p-3">
              <div className="flex items-center justify-between">
                <strong className="text-base md:text-lg font-bold uppercase text-black dark:text-white">
                  {title}
                </strong>
                <div className="flex gap-1">
                  <div className="size-3 border-2 border-black dark:border-white bg-yellow-700 dark:bg-yellow-500"></div>
                  <div className="size-3 border-2 border-black dark:border-white bg-red-500 dark:bg-red-700"></div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-black dark:border-white p-4 sm:p-6">
              <p className="text-base md:text-lg text-pretty text-black dark:text-white">
                {description}
              </p>\
            </div>
          </article>
        </div>
      </div>
    );
}