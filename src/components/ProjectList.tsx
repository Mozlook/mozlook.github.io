import React from "react";
import type { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";

type ProjectsListProps = {
    projects: Project[];
    title?: string;
    className?: string;
};

const ProjectsList: React.FC<ProjectsListProps> = ({
    projects,
    title = "Projects",
    className = "",
}) => {
    return (
        <section
            className={`mt-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[.04] to-white/[.02] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] ring-1 ring-black/40 ${className}`}
        >
            <h2 className="px-2 text-2xl font-semibold tracking-tight">{title}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {projects.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                ))}
            </div>
        </section>
    );
};

export default ProjectsList;
