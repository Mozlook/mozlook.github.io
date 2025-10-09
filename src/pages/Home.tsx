import React from "react";
import Dot from "@/components/Dot";
import CodeBlock from "@/components/CodeBlock";
import ProjectsList from "@/components/ProjectsList";
import { projects } from "@/data/projects";
import { description } from "@/data/description";

const Home: React.FC = () => {
    return (
        <main id="home" className="flex-1">
            <section
                aria-labelledby="home-hero"
                className="grid grid-cols-1 items-stretch gap-4 sm:gap-6 lg:grid-cols-2"
            >
                <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[.03] p-5 sm:p-6 lg:p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] ring-1 ring-black/40">
                    <h1
                        id="home-hero"
                        className="font-semibold tracking-tight text-[clamp(1.75rem,3.5vw,2.75rem)]"
                    >
                        Mikołaj Mozoluk
                    </h1>

                    <p className="mt-3 sm:mt-4 max-w-prose text-[15px] sm:text-[16px] leading-7 text-slate-300/90">
                        Full-Stack Software Developer
                    </p>

                    <div className="pointer-events-none absolute -inset-px rounded-3xl ring-1 ring-white/5" />
                </div>

                <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[.03] p-4 sm:p-5 lg:p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] ring-1 ring-black/40">
                    <div className="mb-3 sm:mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Dot className="bg-rose-400/90" />
                            <Dot className="bg-amber-400/90" />
                            <Dot className="bg-emerald-400/90" />
                        </div>
                        <div className="text-[11px] sm:text-xs text-slate-400">main.go</div>
                    </div>

                    <div
                        className="max-h-[38vh] sm:max-h-[44vh] lg:max-h-[56vh] overflow-auto"
                        style={{
                            maskImage:
                                "linear-gradient(to bottom, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
                            WebkitMaskImage:
                                "linear-gradient(to bottom, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
                        }}
                    >
                        <CodeBlock code={description} language="go" />
                    </div>
                </div>
            </section>

            <section aria-labelledby="home-projects" className="mt-6 sm:mt-8 w-full">
                <h2 id="home-projects" className="sr-only">
                    Projects
                </h2>
                <ProjectsList projects={projects} />
            </section>
        </main>
    );
};

export default Home;
