import Image from "next/image";

export default function Home() {
  return (
    <>
      <nav className="p-4 md:p-8 bg-white dark:bg-black">
        <ul className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
          
          <div className="flex flex-col md:flex-row gap-4 lg:space-x-8 text-center w-full lg:w-auto">
            <li>
              <a
                className="block border-2 border-black dark:border-white bg-white dark:bg-black px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0 transition-all"
                href="#"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                className="block border-2 border-black dark:border-white bg-white dark:bg-black px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0 transition-all"
                href="#"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                className="block border-2 border-black dark:border-white bg-white dark:bg-black px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0 transition-all"
                href="#"
              >
                Certificates
              </a>
            </li>
            <li>
              <a
                className="block border-2 border-black dark:border-white bg-white dark:bg-black px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0 transition-all"
                href="#"
              >
                Social Media & Contact
              </a>
            </li>
          </div>

          <li className="w-full lg:w-auto text-center">
            <a
              className="inline-block border-2 border-black dark:border-white bg-red-500 px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-red-300 focus:outline-0 transition-all"
              href="#"
            >
              💀 Don&apos;t Click Me
            </a>
          </li>
        </ul>
      </nav>

      <main className="">
        <div className="flex flex-col lg:flex-row p-6 md:p-16 items-center lg:items-start gap-8 lg:gap-16">
          <div className="relative shrink-0">
            <Image
              src="/PhotoProfile.png"
              alt="My Profile Picture"
              width={400}
              height={400}
            />
          </div>

          <div className="flex flex-col justify-center w-full md:mt-14 lg:mt-16">
            <h1 className="text-3xl md:text-5xl font-bold text-center lg:text-left text-black dark:text-white">
              Hallo, I&apos;m Rico Eriansyah
            </h1>
            
            <p className="mt-4 text-lg"></p>

            <article className="mt-6 border-2 border-black dark:border-white bg-white dark:bg-black shadow-[4px_4px_0_0,8px_8px_0_0]">
              <div className="bg-yellow-300 dark:bg-yellow-700 p-3">
                <div className="flex items-center justify-between">
                  <strong className="text-sm md:text-base font-bold uppercase text-black dark:text-white">
                    Developer & Educator
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

                <p className="mt-4 text-sm md:text-base text-pretty text-black dark:text-white">
                  Full-stack Developer & Software Engineering Teacher at SMK Purnawarman. I specialize in building robust applications using Laravel, React, and Tailwind CSS, backed by deep expertise in DevOps and infrastructure (TrueNAS, VM, Docker). As a Lab Head, I bridge the gap between web development and complex server management to ensure scalable deployments. Currently mastering Golang, Python, and Local AI. Whether it’s building web apps or configuring self-hosted environments, I deliver high-performance solutions. Ready to bring your technical projects to life.
                </p>
              </div>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}