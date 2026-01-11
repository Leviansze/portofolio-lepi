"use client";

import Image from "next/image";

export function Profile() {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16 border-2 border-black dark:border-white p-4 lg:p-6 shadow-[4px_4px_0_0]">
      <div className="relative shrink-0">
        <Image
          src="/PhotoProfile.png"
          alt="My Profile Picture"
          width={1500}
          height={1500}
          className="mask-clip-border w-64 md:w-[400px] lg:w-[400px] object-cover"
        />
      </div>

      <div className="flex flex-col justify-center w-full md:mt-10 lg:mt-12">
        <h1 className="text-3xl md:text-5xl font-bold text-center lg:text-left text-black dark:text-white">
          Hallo, I&apos;m Rico Eriansyah 👋
        </h1>

        <article className="mt-6 border-2 border-black dark:border-white shadow-[4px_4px_0_0,8px_8px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-red-300 focus:outline-0 transition-all cursor-pointer">
          <div className="bg-blue-500 dark:bg-blue-700 p-3">
            <div className="flex items-center justify-between">
              <strong className="text-base md:text-lg font-bold uppercase text-black dark:text-white">
                Developer & Educator 😉
              </strong>
              <div className="flex gap-1">
                <div className="size-3 border-2 border-black dark:border-white bg-yellow-700 dark:bg-yellow-500"></div>
                <div className="size-3 border-2 border-black dark:border-white bg-red-500 dark:bg-red-700"></div>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-black dark:border-white p-4 sm:p-6">
            <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white">
              Software Engineering Teacher, Head of Computer Laboratory at SMKS
              Purnawarman, Full Stack Web Developer Enthusiast, DevOps
              Enthusiast.
            </h3>

            <p className="mt-4 text-base md:text-lg text-pretty text-black dark:text-white">
              Full-stack Developer & Software Engineering Teacher at SMK Purnawarman. I specialize in building robust applications using Laravel, React, and Tailwind CSS, backed by deep expertise in DevOps and infrastructure (TrueNAS, VM, Docker). As a Lab Head, I bridge the gap between web development and complex server management to ensure scalable deployments. Currently mastering Golang, Python, and Local AI. Whether it’s building web apps or configuring self-hosted environments, I deliver high-performance solutions. Ready to bring your technical projects to life.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}