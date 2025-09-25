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
        const measure = () => {
            const vp = viewportRef.current;
            const item = firstItemRef.current;
            const track = vp?.firstElementChild as HTMLElement | null;

            if (!vp || !item || !track) return;

            const viewportWidth = vp.offsetWidth;
            const itemWidth = item.getBoundingClientRect().width;

            const styles = getComputedStyle(track);
            const gap = parseFloat(styles.gap || styles.columnGap || "0");

            const requiredWidth =
                itemWidth * projects.length + gap * Math.max(0, projects.length - 1);

            setIsCarousel(requiredWidth > viewportWidth);
        };

        const ro = new ResizeObserver(() => requestAnimationFrame(measure));
        if (viewportRef.current) ro.observe(viewportRef.current);
        if (firstItemRef.current) ro.observe(firstItemRef.current);

        requestAnimationFrame(measure);

        return () => ro.disconnect();
    }, [projects.length]);

    return (
        <section
            className={`mt-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[.04] to-white/[.02] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] ring-1 ring-black/40 ${className}`}
        >
            <h2 className="px-2 text-2xl font-semibold tracking-tight">{title}</h2>
            {isCarousel ? (
                <ProjectCarousel projects={projects} speed={50} />
            ) : (
                <div ref={viewportRef} className="mt-6 overflow-hidden">
                    <ProjectsGrid firstItemRef={firstItemRef} projects={projects} />
                </div>
            )}
        </section>
    );
};

export default ProjectsList;
