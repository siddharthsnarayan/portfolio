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

  const [frameIndex, setFrameIndex] = useState(walkBeforeStart);
  const [mode, setMode] = useState<Mode>('walkBefore');
  const [jumpPlayed, setJumpPlayed] = useState(false);
  const [position, setPosition] = useState(0);

  const modeRef = useRef<Mode>('walkBefore');
  const jumpPlayedRef = useRef(false);
  const positionRef = useRef(0);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    jumpPlayedRef.current = jumpPlayed;
  }, [jumpPlayed]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const speedPerMs = 1 / 60000;
    const walkFrameDuration = 80;
    const jumpFrameDuration = 80;
    const jumpStart = 0.39;
    const jumpEnd = 0.49;

    let walkAccumulator = 0;
    let jumpAccumulator = 0;

    function tick(now: number) {
      const dt = now - lastTime;
      lastTime = now;

      const prevPos = positionRef.current;
      let next = prevPos + speedPerMs * dt;
      let wrapped = false;
      if (next > 1) {
        next -= 1;
        wrapped = true;
      }
      positionRef.current = next;
      setPosition(next);

      if (wrapped) {
        setMode('walkBefore');
        modeRef.current = 'walkBefore';
        setFrameIndex(walkBeforeStart);
        setJumpPlayed(false);
        jumpPlayedRef.current = false;
        walkAccumulator = 0;
        jumpAccumulator = 0;
      }

      const currentMode = modeRef.current;

      if (!jumpPlayedRef.current && currentMode === 'walkBefore') {
        const pos = positionRef.current;
        if (pos >= jumpStart && pos <= jumpEnd) {
          setMode('jump');
          modeRef.current = 'jump';
          setFrameIndex(jumpStartFrame);
          setJumpPlayed(true);
          jumpPlayedRef.current = true;
        }
      }

      if (modeRef.current === 'walkBefore') {
        walkAccumulator += dt;
        if (walkAccumulator >= walkFrameDuration) {
          walkAccumulator -= walkFrameDuration;
          setFrameIndex((prev) => {
            if (prev < walkBeforeStart || prev > walkBeforeEnd) {
              return walkBeforeStart;
            }
            const next = prev + 1;
            return next > walkBeforeEnd ? walkBeforeStart : next;
          });
        }
      } else if (modeRef.current === 'jump') {
        jumpAccumulator += dt;
        if (jumpAccumulator >= jumpFrameDuration) {
          jumpAccumulator -= jumpFrameDuration;
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
        }
      } else if (modeRef.current === 'walkAfter') {
        walkAccumulator += dt;
        if (walkAccumulator >= walkFrameDuration) {
          walkAccumulator -= walkFrameDuration;
          setFrameIndex((prev) => {
            if (prev < walkAfterStart || prev > walkAfterEnd) {
              return walkAfterStart;
            }
            const next = prev + 1;
            return next > walkAfterEnd ? walkAfterStart : next;
          });
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    }

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [fullFrames.length, walkBeforeStart, walkBeforeEnd, walkAfterStart, walkAfterEnd, jumpStartFrame, jumpEndFrame]);

  const startX = -20;
  const endX = 780;
  const translateX = startX + (endX - startX) * position;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-full flex justify-start z-[60]">
      <div
        style={{
          transform: `translate(${translateX}%, 10px)`,
        }}
      >
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
