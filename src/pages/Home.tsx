import React from "react";
import Dot from "@/components/Dot";
import CodeBlock from "@/components/CodeBlock";
import ProjectsList from "@/components/ProjectsList";
import { projects } from "@/data/projects";
import { description } from "@/data/description";

const Home: React.FC = () => {
    return (
        <main className="flex-1">
            <section className="grid items-stretch gap-6 lg:grid-cols-2">
                <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[.03] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] ring-1 ring-black/40">
                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                        Mikołaj Mozoluk
                    </h1>
                    <p className="mt-4 max-w-prose text-slate-300/90">
                        Full-Stack Software Developer
                    </p>

                    <div className="pointer-events-none absolute -inset-px rounded-3xl ring-1 ring-white/5" />
                </div>

                <div className="relative max-h-[460px] max-w-full overflow-auto rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[.03] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] ring-1 ring-black/40">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Dot className="bg-rose-400/90" />
                            <Dot className="bg-amber-400/90" />
                            <Dot className="bg-emerald-400/90" />
                        </div>
                        <div className="text-xs text-slate-400">main.go</div>
                    </div>
                    <CodeBlock code={description} language="go" />
                </div>
            </section>
            <section className="w-full">
                <ProjectsList projects={projects} />
            </section>
        </main>
    );
};

export default Home;
