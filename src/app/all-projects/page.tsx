'use client';

import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { useEffect, useState } from 'react';

function WalkingOverlay() {
  const frames = [
    '/walk/walk_0000.png',
    '/walk/walk_0001.png',
    '/walk/walk_0002.png',
    '/walk/walk_0003.png',
    '/walk/walk_0004.png',
    '/walk/walk_0005.png',
    '/walk/walk_0006.png',
    '/walk/walk_0007.png',
    '/walk/walk_0008.png',
    '/walk/walk_0009.png',
    '/walk/walk_0010.png',
    '/walk/walk_0011.png',
    '/walk/walk_0012.png',
    '/walk/walk_0013.png',
    '/walk/walk_0014.png',
  ];

  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, 80);

    return () => clearInterval(interval);
  }, [frames.length]);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-full flex justify-start z-[60]">
      <div className="walk-horizontal">
        <Image
          src={frames[frameIndex]}
          alt="Walking Siddharth illustration"
          width={160}
          height={260}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

export default function AllProjects() {
  return (
    <div className="pt-32 px-6 lg:px-12 max-w-[1920px] mx-auto bg-black">
      <div className="relative">
        <WalkingOverlay />
        <div className="mt-0 md:mt-0 grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-12 pb-24 relative z-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
