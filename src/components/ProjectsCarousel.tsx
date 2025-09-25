import { useEffect, useMemo, useRef } from "react";
import type { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
type ProjectCarouselProps = {
    projects: Project[];
    speed?: number;
};
const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
    projects,
    speed = 50,
}) => {
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const items = useMemo(() => [...projects, ...projects], [projects]);

    const originalWidthRef = useRef<number>(0);
    const offsetRef = useRef<number>(0);
    const lastTsRef = useRef<number | null>(null);
    const rafIdRef = useRef<number | null>(null);

    useEffect(() => {
        const measure = () => {
            const track = trackRef.current;
            if (!track) return;

            const first = track.children[0] as HTMLElement | undefined;
            const nextCycleStart = track.children[projects.length] as
                | HTMLElement
                | undefined;

            if (first && nextCycleStart) {
                const left = first.getBoundingClientRect().left;
                const right = nextCycleStart.getBoundingClientRect().left;
                originalWidthRef.current = right - left; // faktyczna szerokość jednego cyklu
            }

            const w = originalWidthRef.current || 1;
            offsetRef.current = offsetRef.current % w;

            if (track) {
                track.style.transform = `translate3d(-${offsetRef.current}px,0,0)`;
            }
        };

        const id = requestAnimationFrame(measure);

        const ro = new ResizeObserver(() => requestAnimationFrame(measure));
        if (trackRef.current) ro.observe(trackRef.current);

        return () => {
            cancelAnimationFrame(id);
            ro.disconnect();
        };
    }, [projects.length]);

    useEffect(() => {
        const step = (ts: number) => {
            const track = trackRef.current;
            const w = originalWidthRef.current;

            if (!track) {
                rafIdRef.current = requestAnimationFrame(step);
                return;
            }
            if (lastTsRef.current == null) lastTsRef.current = ts;

            const dt = (ts - lastTsRef.current) / 1000;
            lastTsRef.current = ts;

            if (w > 0) {
                offsetRef.current += speed * dt;
                if (offsetRef.current >= 1.5 * w) {
                    offsetRef.current -= w;
                }

                track.style.transform = `translate3d(-${offsetRef.current}px,0,0)`;
            }
            rafIdRef.current = requestAnimationFrame(step);
        };

        rafIdRef.current = requestAnimationFrame(step);

        return () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            lastTsRef.current = null;
        };
    }, [speed]);

    return (
        <div ref={viewportRef} className="relative mt-6 overflow-hidden w-full">
            <div
                ref={trackRef}
                className="flex flex-nowrap gap-6 will-change-transform"
                style={{ transform: "translate3d(0,0,0)" }}
            >
                {items.map((project, i) => (
                    <div
                        key={`${project.id}-${i}`}
                        className={
                            "shrink-0 min-w-[280px] sm:min-w-[320px] lg:min-w-[360px]"
                        }
                    >
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ProjectCarousel;
