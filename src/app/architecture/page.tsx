import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function Architecture() {
  const architectureOrder = ['7', '8', '9', '10', '12'];
  const architectureProjects = architectureOrder
    .map((id) => projects.find((p) => p.id === id))
    .filter((p) => p !== undefined);

  return (
    <div className="pt-32 px-6 lg:px-12 max-w-[1920px] mx-auto bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-12 pb-24">
        {architectureProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
