"use client";

import ImageCard from "../ui/image-card";

export function ContactAndSocialMedia() {
  return (
    <>
      <h1 className="bg-pink-400 dark:bg-pink-700 text-3xl md:text-5xl font-bold text-center text-black dark:text-white border-2 border-black dark:border-white shadow-[4px_4px_0_0] p-4 lg:p-6">
        My Contact & Social Media 📱
      </h1>
      <div className="flex flex-col gap-6 my-8 border-2 border-black dark:border-white p-6 md:p-16 shadow-[4px_4px_0_0]">
        <ImageCard imageUrl="/project-one.png" caption="Email" className="border-2 border-black dark:border-white shadow-[4px_4px_0_0]"></ImageCard>
      </div>
    </>
  );
}