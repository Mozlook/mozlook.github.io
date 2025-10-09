import React from "react";
import type { Project } from "@/types/project";
import { Link } from "react-router-dom";

type ProjectCardProps = {
    project: Project;
    className?: string;
};

const statusStyles: Record<NonNullable<Project["status"]>, string> = {
    finished: "bg-emerald-500/15 text-emerald-200 border-emerald-500/25",
    maintained: "bg-sky-500/15 text-sky-200 border-sky-500/25",
    wip: "bg-amber-500/15 text-amber-200 border-amber-500/25",
};

const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    className = "",
}) => {
    const {
        title,
        headline,
        href,
        status,
        iconGradientFrom = "from-indigo-500/60",
        iconGradientTo = "to-blue-600/60",
        tags = [],
    } = project;

    const isExternal = /^https?:\/\//i.test(href ?? "");

    return (
        <article
            className={[
                "group relative w-full min-w-0 max-w-full overflow-x-hidden overflow-y-visible",
                "rounded-2xl border border-white/10 bg-gradient-to-b from-slate-800/40 to-slate-900/40 p-4",
                "ring-1 ring-black/40 transition",
                "hover:border-white/20 hover:shadow-[0_10px_40px_-10px_rgba(2,132,199,.35)]",
                "motion-reduce:transition-none",
                className,
            ].join(" ")}
        >
            <div className="mb-3 flex items-center justify-between gap-3">
                <div
                    className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${iconGradientFrom} ${iconGradientTo}`}
                    aria-hidden
                />
                {status && (
                    <span
                        className={[
                            "ml-auto select-none rounded-full border px-2 py-0.5 text-xs font-medium",
                            statusStyles[status],
                        ].join(" ")}
                    >
                        {status === "finished"
                            ? "Finished"
                            : status === "maintained"
                                ? "Maintained"
                                : "Work in progress"}
                    </span>
                )}
            </div>

            <h3 className="text-lg font-medium text-slate-100 break-words">
                {title}
            </h3>

            {headline && (
                <p className="mt-1 line-clamp-3 text-sm text-slate-400 break-words">
                    {headline}
                </p>
            )}

            {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((t) => (
                        <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-300"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            )}

            {href &&
                (isExternal ? (
                    <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                        aria-label={`${title} – open in new tab`}
                    >
                        <span className="sr-only">{title}</span>
                    </a>
                ) : (
                    <Link
                        to={href}
                        className="absolute inset-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                        aria-label={`${title} – open`}
                    >
                        <span className="sr-only">{title}</span>
                    </Link>
                ))}

            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
        </article>
    );
};

export default ProjectCard;
