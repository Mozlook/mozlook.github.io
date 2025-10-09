import { useRef, useState, useEffect } from "react";
import type { Project } from "@/types/project";
import ProjectsGrid from "./ProjectsGrid";
import ProjectCarousel from "./ProjectsCarousel";

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
    const viewportRef = useRef<HTMLDivElement>(null);
    const firstItemRef = useRef<HTMLDivElement>(null);
    const [isCarousel, setIsCarousel] = useState(false);

    useEffect(() => {
        const compute = () => {
            const vp = viewportRef.current;
            if (!vp) return;

            const w = vp.offsetWidth;
            const gap = 24; // gap-6
            const lg = w >= 1024; // zgodnie z Tailwind lg:
            const maxCols = 4;

            // Docelowa, estymowana MIN-szerokość karty na desktopie (spójna z karuzelą)
            const cardMin = 360;

            // Ile potrzeba, by ZMIEŚCIĆ jeden rząd 4 kart
            const needForOneRow = maxCols * cardMin + (maxCols - 1) * gap;

            // Histereza (~1 gap) żeby nie migało przy granicy
            const HYST = 24;

            // Tylko na desktopie: jeśli 1 rząd się NIE mieści → karuzela
            const shouldCarousel = lg && w + HYST < needForOneRow;

            setIsCarousel(shouldCarousel);
        };

        const ro = new ResizeObserver(() => requestAnimationFrame(compute));
        if (viewportRef.current) ro.observe(viewportRef.current);

        requestAnimationFrame(compute);
        return () => ro.disconnect();
    }, []);

    return (
        <section
            aria-labelledby="projects-heading"
            className={`mt-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[.04] to-white/[.02] p-5 sm:p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] ring-1 ring-black/40 ${className}`}
        >
            <h2
                id="projects-heading"
                className="px-2 text-[clamp(1.25rem,1.6vw,1.5rem)] font-semibold tracking-tight"
            >
                {title}
            </h2>

            <div
                ref={viewportRef}
                className="mt-4 sm:mt-6 w-full overflow-x-hidden overflow-y-visible"
            >
                {isCarousel ? (
                    <ProjectCarousel projects={projects} speed={50} />
                ) : (
                    <ProjectsGrid firstItemRef={firstItemRef} projects={projects} />
                )}
            </div>
        </section>
    );
};

export default ProjectsList;
