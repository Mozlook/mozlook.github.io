import Dot from "@/components/Dot";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const Projects: React.FC = () => {
    return (
        <main className="flex-1">
            <section className="grid items-stretch gap-6 min-h-0 lg:grid-cols-2">
                <div className="relative rounded-3xl border h-[90vh] min-h-0 overflow-hidden border-white/10 bg-gradient-to-b from-white/5 to-white/[.03] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] ring-1 ring-black/40 flex flex-col">
                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl flex-shrink-0">
                        Projects
                    </h1>
                    <div
                        className="mt-4 flex-1 overflow-auto pr-2 scrollbar-hide"
                        style={{
                            maskImage:
                                "linear-gradient(to bottom, transparent 0px, black 24px, black calc(100% - 24px), transparent 100%)",
                            WebkitMaskImage:
                                "linear-gradient(to bottom, transparent 0px, black 24px, black calc(100% - 24px), transparent 100%)",
                        }}
                    >
                        <div className="flex flex-col mt-6 gap-6">
                            {projects.map((p, i) => {
                                return <ProjectCard key={`${p.id}-${i}`} project={p} />;
                            })}
                        </div>
                    </div>
                </div>

                <div className="relative max-h-[460px] max-w-full overflow-auto rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[.03] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] ring-1 ring-black/40">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Dot className="bg-rose-400/90" />
                            <Dot className="bg-amber-400/90" />
                            <Dot className="bg-emerald-400/90" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Projects;
