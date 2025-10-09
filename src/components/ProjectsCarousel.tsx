import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
import ProjectGalleryTooltip from "./ProjectGalleryTooltip";

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
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const items = useMemo(() => [...projects, ...projects], [projects]);

    const originalWidthRef = useRef(0);
    const offsetRef = useRef(0);
    const lastTsRef = useRef<number | null>(null);
    const rafIdRef = useRef<number | null>(null);

    const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const runningRef = useRef<boolean>(!reduceMotion);

    useEffect(() => {
        cardRefs.current = cardRefs.current.slice(0, items.length);
    }, [items.length]);

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
                originalWidthRef.current = right - left; // = w
            }

            const w = originalWidthRef.current || 1;
            offsetRef.current = offsetRef.current % w;

            track.style.transform = `translate3d(-${offsetRef.current}px,0,0)`;
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

            if (runningRef.current && w > 0) {
                offsetRef.current += speed * dt;
                if (offsetRef.current >= w) {
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

    const [previewProject, setPreviewProject] = useState<number | null>(null);

    return (
        <div
            ref={viewportRef}
            className="relative mt-6 w-full overflow-x-hidden overflow-y-visible"
            onMouseEnter={() => {
                runningRef.current = false;
            }}
            onMouseLeave={() => {
                runningRef.current = !reduceMotion;
            }}
        >
            <div className="overflow-x-hidden">
                <div
                    ref={trackRef}
                    className="flex flex-nowrap gap-6 will-change-transform"
                    style={{ transform: "translate3d(0,0,0)" }}
                >
                    {items.map((project, i) => {
                        const isPreview = previewProject !== null && previewProject === i;

                        return (
                            <div
                                key={`${project.id}-${i}`}
                                ref={(el) => {
                                    cardRefs.current[i] = el;
                                }}
                                className="relative shrink-0 min-w-[280px] sm:min-w-[320px] lg:min-w-[360px]"
                                style={{ zIndex: isPreview ? 100 : 1 }}
                                onMouseEnter={() => setPreviewProject(i)}
                                onMouseLeave={() => setPreviewProject(null)}
                            >
                                {isPreview && cardRefs.current[i] && (
                                    <ProjectGalleryTooltip
                                        project={project}
                                        anchorRef={{ current: cardRefs.current[i] }}
                                    />
                                )}

                                <ProjectCard project={project} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProjectCarousel;
