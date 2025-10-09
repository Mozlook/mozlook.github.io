import React, { useEffect, useMemo, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Dot from "@/components/Dot";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetails from "@/components/ProjectDetails";
import { projects } from "@/data/projects";

const Projects: React.FC = () => {
    const { title } = useParams<{ title?: string }>();
    const activeTitle = (title ?? "").toLowerCase();

    const project = useMemo(
        () => projects.find((p) => p.title.toLowerCase() === activeTitle),
        [activeTitle],
    );

    const navigate = useNavigate();

    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!title || !listRef.current) return;
        const selector = `[data-project="${CSS.escape(title)}"]`;
        const el = listRef.current.querySelector(selector) as HTMLElement | null;
        if (el) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }, [title]);

    function selectRandomProject() {
        const random = projects[Math.floor(Math.random() * projects.length)];
        navigate(`/projects/${encodeURIComponent(random.title)}`);
    }

    return (
        <main className="flex-1">
            <section className="grid min-h-0 items-start gap-6 lg:grid-cols-8">
                <div className="lg:col-span-3 flex h-[86vh] min-h-[540px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[.03] p-6 ring-1 ring-black/40">
                    <h1 className="flex-shrink-0 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Projects
                    </h1>

                    <div
                        ref={listRef}
                        className="mt-4 flex-1 overflow-auto pr-2 scrollbar-hide"
                        style={{
                            maskImage:
                                "linear-gradient(to bottom, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
                            WebkitMaskImage:
                                "linear-gradient(to bottom, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
                        }}
                    >
                        <ul
                            className="mt-6 flex flex-col gap-6"
                            role="listbox"
                            aria-label="Projects"
                        >
                            {projects.map((p) => {
                                const isActive = p.title.toLowerCase() === activeTitle;
                                return (
                                    <li
                                        key={p.id}
                                        role="option"
                                        aria-selected={isActive}
                                        data-project={p.title}
                                    >
                                        <Link
                                            to={`/projects/${encodeURIComponent(p.title)}`}
                                            className="block"
                                        >
                                            <ProjectCard
                                                project={p}
                                                className={
                                                    isActive
                                                        ? "border-cyan-400/40 shadow-[inset_0_0_0_1px_rgba(34,211,238,.35)]"
                                                        : ""
                                                }
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="relative lg:col-span-5 min-h-[280px] w-full overflow-auto rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[.03] p-6 ring-1 ring-black/40">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Dot className="bg-rose-400/90" />
                            <Dot className="bg-amber-400/90" />
                            <Dot className="bg-emerald-400/90" />
                        </div>
                    </div>

                    <ProjectDetails
                        project={project}
                        selectRandomProject={selectRandomProject}
                    />
                </div>
            </section>
        </main>
    );
};

export default Projects;
