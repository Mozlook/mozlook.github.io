import { useMemo } from "react";
import type { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
type ProjectCarouselProps = {
    projects: Project[];
};
const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
    const items = useMemo(() => [...projects, ...projects], [projects]);
    //TODO: Add Carousel Logic
    return (
        <div className="relative mt-6 overflow-hidden w-full">
            <div className="flex flex-nowrap gap-6 will-change-transform">
                {items.map((project, i) => (
                    <div
                        key={`${project.id}-${i}`}
                        className={"min-w-[280px] sm:min-w-[320px] lg:min-w-[360px]"}
                    >
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ProjectCarousel;
