import { useEffect, useRef, useState } from "react";
import FolderIcon from "@/assets/FolderIcon";
import type { Project } from "@/types/project";
import ImageGallery from "./ImageGallery";

type ProjectDetailsProps = {
    project?: Project;
    selectRandomProject: () => void;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
    project,
    selectRandomProject,
}) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("click", onClick);
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("click", onClick);
            window.removeEventListener("keydown", onKey);
        };
    }, []);

    if (project) {
        const previewLink = project.preview;
        const repos = Array.isArray(project.repo) ? project.repo.slice(0, 6) : [];

        return (
            <div className="flex w-full flex-col gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[.03] p-6 text-left shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] ring-1 ring-black/40">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div
                            className={`h-10 w-10 rounded-xl bg-gradient-to-br ${project.iconGradientFrom ?? "from-indigo-500/60"} ${project.iconGradientTo ?? "to-blue-600/60"}`}
                        />
                        <h2 className="text-2xl font-semibold tracking-tight text-white">
                            {project.title}
                        </h2>
                    </div>

                    <div className="relative flex items-center gap-3" ref={menuRef}>
                        {previewLink && (
                            <a
                                href={previewLink}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition hover:bg-white/10"
                            >
                                Preview
                            </a>
                        )}

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen((s) => !s);
                            }}
                            aria-haspopup="menu"
                            aria-expanded={open}
                            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                                <path
                                    d="M4 7h16M4 12h16M4 17h16"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>

                        {open && (
                            <div
                                role="menu"
                                className="absolute right-0 top-12 z-20 min-w-44 rounded-xl border border-white/10 bg-slate-900/80 p-1.5 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60"
                            >
                                {repos.length ? (
                                    repos.map((r) => (
                                        <a
                                            key={r.href}
                                            href={r.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            role="menuitem"
                                            className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
                                            onClick={() => setOpen(false)}
                                        >
                                            {r.label}
                                        </a>
                                    ))
                                ) : (
                                    <div className="px-3 py-2 text-sm text-slate-400">
                                        No repositories
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {!!project.tags?.length && (
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((t) => (
                            <span
                                key={t}
                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-sm text-slate-200"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                )}
                {project.desc && (
                    <p className="max-w-prose text-lg leading-7 text-slate-300/90">
                        {project.desc}
                    </p>
                )}
                <ImageGallery project={project} />
            </div>
        );
    }
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[.03] p-8 text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] ring-1 ring-black/40">
            <FolderIcon />
            <h2 className="text-xl font-semibold text-white">Select a project</h2>
            <p className="max-w-prose text-slate-400">
                Choose one from the list to see details and gallery.
            </p>
            <button
                onClick={selectRandomProject}
                className="mt-2 inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 transition hover:bg-white/10 disabled:opacity-40"
            >
                Random project
            </button>
        </div>
    );
};

export default ProjectDetails;
