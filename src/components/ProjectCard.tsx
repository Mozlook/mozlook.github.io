import React from "react";
import type { Project } from "../types/project";

type ProjectCardProps = {
    project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const {
        title,
        desc,
        href,
        iconGradientFrom = "from-indigo-500/60",
        iconGradientTo = "to-blue-600/60",
        tags = [],
    } = project;

    return (
        <article className="w-full min-w-0 max-w-full group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-800/40 to-slate-900/40 p-4 ring-1 ring-black/40 transition hover:border-white/20 hover:shadow-[0_10px_40px_-10px_rgba(2,132,199,.35)]">
            <div
                className={`mb-4 h-10 w-10 rounded-xl bg-gradient-to-br ${iconGradientFrom} ${iconGradientTo}`}
            />
            <h3 className="text-lg font-medium text-slate-100 break-words">
                {title}
            </h3>
            <p className="mt-1 text-sm text-slate-400 break-words">{desc}</p>

            {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((t: string) => (
                        <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-300"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            )}

            {href && (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0"
                    aria-label={`${title} – open`}
                />
            )}

            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
        </article>
    );
};

export default ProjectCard;
