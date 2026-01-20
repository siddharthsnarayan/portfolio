import { projects } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 px-6 lg:px-12 max-w-[1920px] mx-auto space-y-12 pb-24">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-4xl font-light text-white">{project.title}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-400 uppercase tracking-widest gap-2 sm:gap-8">
          <span>{project.category}</span>
          <span>{project.year}</span>
          {project.location && <span>{project.location}</span>}
        </div>
      </header>

      {/* Description */}
      {project.description && (
        <div className="text-lg leading-relaxed text-gray-300 max-w-2xl">
          <p>{project.description}</p>
        </div>
      )}

      {/* Main Image */}
      <div className="relative aspect-video w-full bg-black">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Additional Images */}
      {project.images && project.images.length > 0 && (
        <div className="space-y-12">
          {project.images.map((img, index) => (
            <div key={index} className="relative aspect-video w-full bg-black">
              <Image
                src={img}
                alt={`${project.title} detail ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="pt-12 border-t border-gray-800 flex justify-between items-center text-sm uppercase tracking-widest text-gray-400">
        <Link href="/all-projects" className="hover:text-white transition-colors">
          ← Back to Projects
        </Link>
        <Link href="#" className="hover:text-white transition-colors">
          Back to Top ↑
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}
