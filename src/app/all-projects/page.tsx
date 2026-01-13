import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function AllProjects() {
  return (
    <div className="pt-32 px-6 lg:px-12 max-w-[1920px] mx-auto bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-12 pb-24">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
