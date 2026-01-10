"use client";

import { ProjectLists } from "@/components/Organisms/ProjectLists";

export function Projects() {
    const Projects = [
        {
            id: 'project-one',
            title: 'PT. Asri Berkah Mirai Driver Tracker Mobile App',
            techStack: 'Ionic React, Laravel, MySQL, Axios',
            description: 'An app for tracking drivers and task management, vehicle maintenance and users. In creating and developing the frontend using Ionic React and the backend API using Laravel, using the axios library to connect the API to the frontend app.',
            liveDemoLink: '#',
            sourceCodeLink: '#',
            imageSrc: '/project-one.png',
            imageWidth: 1500,
            imageHeight: 1500,
        },
        {
            id: 'project-two',
            title: 'Mutiara Bangsa Vocational School Academic System App',
            techStack: 'Ionic React, Laravel, MySQL, Axios',
            description: 'An application for managing users, students, teachers, staff, lesson schedules, classes, departments, assignment/exam grades, and PPDB. In creating and developing frontend using Ionic React and backend API using Laravel, using the axios library to connect the API to the frontend application.',
            liveDemoLink: '#',
            sourceCodeLink: '#',
            imageSrc: '/project-one.png',
            imageWidth: 1500,
            imageHeight: 1500,
        },
    ];
  return (
    <>
      <h1 className="text-3xl md:text-5xl font-bold text-center text-black dark:text-white pt-8">
        My Projects 🖥️
      </h1>
      {Projects.map((project, index) => (
        <ProjectLists nextProjectId={""} key={index} {...project} />
      ))}
    </>
  );
}