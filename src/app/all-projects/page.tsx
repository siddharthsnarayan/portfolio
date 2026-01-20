'use client';

import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { useEffect, useRef, useState } from 'react';

type Mode = 'walkBefore' | 'jump' | 'walkAfter';

function WalkingOverlay() {
  const fullFrames = Array.from({ length: 100 }, (_, index) => {
    const id = index.toString().padStart(4, '0');
    return `/full/full_${id}.png`;
  });

  const walkBeforeStart = 0;
  const walkBeforeEnd = 16;
  const jumpStartFrame = 17;
  const jumpEndFrame = 84;
  const walkAfterStart = 86;
  const walkAfterEnd = 99;
  const cycleDurationMs = 60000;
  const jumpStartFraction = 0.39;
  const jumpStartMs = cycleDurationMs * jumpStartFraction;
  const frameIntervalMs = 80;

  const [frameIndex, setFrameIndex] = useState(walkBeforeStart);
  const [mode, setMode] = useState<Mode>('walkBefore');
  const [jumpPlayed, setJumpPlayed] = useState(false);

  const modeRef = useRef<Mode>('walkBefore');
  const jumpPlayedRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    jumpPlayedRef.current = jumpPlayed;
  }, [jumpPlayed]);

  const resetCycle = () => {
    const now = performance.now();
    startTimeRef.current = now;
    modeRef.current = 'walkBefore';
    jumpPlayedRef.current = false;
    setMode('walkBefore');
    setFrameIndex(walkBeforeStart);
    setJumpPlayed(false);
  };

  useEffect(() => {
    startTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (startTimeRef.current === null) {
        return;
      }

      const elapsed = performance.now() - startTimeRef.current;
      const currentMode = modeRef.current;

      if (currentMode === 'walkBefore') {
        if (!jumpPlayedRef.current && elapsed >= jumpStartMs) {
          setMode('jump');
          modeRef.current = 'jump';
          setFrameIndex(jumpStartFrame);
          setJumpPlayed(true);
          jumpPlayedRef.current = true;
          return;
        }

        setFrameIndex((prev) => {
          if (prev < walkBeforeStart || prev > walkBeforeEnd) {
            return walkBeforeStart;
          }
          const next = prev + 1;
          return next > walkBeforeEnd ? walkBeforeStart : next;
        });
      } else if (currentMode === 'jump') {
        setFrameIndex((prev) => {
          if (prev < jumpStartFrame || prev > jumpEndFrame) {
            return jumpStartFrame;
          }
          if (prev >= jumpEndFrame) {
            setMode('walkAfter');
            modeRef.current = 'walkAfter';
            return walkAfterStart;
          }
          return prev + 1;
        });
      } else if (currentMode === 'walkAfter') {
        setFrameIndex((prev) => {
          if (prev < walkAfterStart || prev > walkAfterEnd) {
            return walkAfterStart;
          }
          const next = prev + 1;
          return next > walkAfterEnd ? walkAfterStart : next;
        });
      }
    }, frameIntervalMs);

    return () => window.clearInterval(id);
  }, [jumpStartMs, walkBeforeStart, walkBeforeEnd, jumpStartFrame, jumpEndFrame, walkAfterStart, walkAfterEnd]);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-full flex justify-start z-[60]">
      <div className="walk-horizontal" onAnimationStart={resetCycle} onAnimationIteration={resetCycle}>
        <Image
          src={fullFrames[frameIndex]}
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
