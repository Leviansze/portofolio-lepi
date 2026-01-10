"use client";

import Image from "next/image";

export function Certificates() {
  const handleCertificateClick = () => {
    window.open('https://www.codepolitan.com/c/JQ1CUZW/', '_blank');
  };

  return (
    <>
      <h1 className="text-3xl md:text-5xl font-bold text-center text-black dark:text-white pt-8">
        My Certificates 🎖️
      </h1>
      <div className="flex flex-col lg:flex-row p-6 md:p-16 items-center lg:items-start gap-8 lg:gap-16">
        <div className="relative shrink-0">
          <Image
            src="/project-one.png"
            alt="My Profile Picture"
            width={2000}
            height={2000}
            className="mask-clip-border w-72 md:w-[600px] lg:w-[600px] object-cover py-auto"
          />
        </div>

        <div className="flex flex-col justify-center w-full">
          <article className="border-2 border-black dark:border-white shadow-[4px_4px_0_0,8px_8px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-red-300 focus:outline-0 transition-all cursor-pointer" onClick={handleCertificateClick}>
            <div className="bg-yellow-300 dark:bg-yellow-700 p-3">
              <div className="flex items-center justify-between">
                <strong className="text-base md:text-lg font-bold uppercase text-black dark:text-white">
                  Project One
                </strong>
                <div className="flex gap-1">
                  <div className="size-3 border-2 border-black dark:border-white bg-yellow-700 dark:bg-yellow-500"></div>
                  <div className="size-3 border-2 border-black dark:border-white bg-red-500 dark:bg-red-700"></div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-black dark:border-white p-4 sm:p-6">
              <p className="text-base md:text-lg text-pretty text-black dark:text-white">
                An app for tracking drivers and task management, vehicle maintenance and users. In creating and developing the frontend using Ionic React and the backend API using Laravel, using the axios library to connect the API to the frontend app.
              </p>
              <p className="mt-4 text-base md:text-lg text-pretty text-black dark:text-white">
                Tech Stack : Ionic React, Laravel, MySQL, Axios
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}