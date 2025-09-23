import type { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
type ProjectsGridProps = {
    projects: Project[];
    firstItemRef: React.Ref<HTMLDivElement>;
};
const ProjectsGrid: React.FC<ProjectsGridProps> = ({
    projects,
    firstItemRef,
}) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p, i) => (
                <div
                    key={`${p.id}-${i}`}
                    ref={i === 0 ? firstItemRef : undefined}
                    className="min-w-0"
                >
                    <ProjectCard project={p} />
                </div>
            ))}
        </div>
    );
};

export default ProjectsGrid;
