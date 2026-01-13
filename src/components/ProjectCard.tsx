import Image from 'next/image';
import { Project } from '@/data/projects';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-500" />
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-lg font-medium text-white mb-1 text-center">
            {project.title}
          </h3>
          <p className="text-sm text-gray-300 uppercase tracking-wider">
            {project.year}
          </p>
        </div>
      </div>
    </Link>
  );
}
