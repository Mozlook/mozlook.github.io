import { getProjectImages } from "@/helper";
import type { Project } from "@/types/project";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ProjectGalleryTooltipProps = {
    project: Project;
    intervalMs?: number;
    anchorRef: React.RefObject<HTMLElement>;
};

type Pos = {
    left: number;
    top: number;
    placement: "above" | "below";
    w: number;
    h: number;
};

const ProjectGalleryTooltip: React.FC<ProjectGalleryTooltipProps> = ({
    project,
    intervalMs = 2500,
    anchorRef,
}) => {
    const images = useMemo(() => getProjectImages(project.slug), [project.slug]);
    const [current, setCurrent] = useState(0);
    const [pos, setPos] = useState<Pos | null>(null);
    const rafRef = useRef<number | null>(null);

    const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    useEffect(() => setCurrent(0), [images.length]);

    useEffect(() => {
        if (images.length <= 1) return;
        const id = setInterval(
            () => setCurrent((p) => (p + 1) % images.length),
            intervalMs,
        );
        return () => clearInterval(id);
    }, [images.length, intervalMs]);

    useEffect(() => {
        const measure = () => {
            const anchor = anchorRef.current;
            if (!anchor) return;

            const rect = anchor.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;

            const w = Math.min(
                480,
                Math.max(
                    260,
                    vw * (vw < 640 ? 0.8 : vw < 768 ? 0.7 : vw < 1024 ? 0.56 : 0.4),
                ),
            );
            const h = Math.min(
                360,
                Math.max(
                    160,
                    vh * (vw < 640 ? 0.28 : vw < 768 ? 0.32 : vw < 1024 ? 0.36 : 0.38),
                ),
            );

            const margin = 12;
            const offsetY = 16;
            const centerX = rect.left + rect.width / 2;

            const half = w / 2;
            const minX = margin + half;
            const maxX = vw - margin - half;
            const clampedCenter = Math.max(minX, Math.min(maxX, centerX));

            const spaceAbove = rect.top - margin;
            const spaceBelow = vh - (rect.bottom + margin);

            const placement: "above" | "below" =
                spaceAbove >= h + offsetY || spaceAbove > spaceBelow
                    ? "above"
                    : "below";

            const top =
                placement === "above" ? rect.top - offsetY - h : rect.bottom + offsetY;

            setPos({ left: clampedCenter, top, placement, w, h });
        };

        const schedule = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(measure);
        };

        schedule();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
        };
    }, [anchorRef]);

    if (!images.length || !pos) return null;

    const tooltip = (
        <div
            className="pointer-events-none fixed z-[9999]"
            style={{
                left: `${pos.left}px`,
                top: `${pos.top}px`,
                transform: "translateX(-50%)",
                width: `${pos.w}px`,
            }}
        >
            <div
                className="rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl ring-1 ring-black/40 backdrop-blur"
                style={{ height: `${pos.h}px` }}
            >
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`${project.title} preview ${idx + 1}`}
                            className="absolute inset-0 h-full w-full rounded-lg object-cover"
                            style={{
                                opacity: current === idx ? 1 : 0,
                                transition: reduceMotion ? "none" : "opacity 400ms ease",
                            }}
                            draggable={false}
                        />
                    ))}
                </div>

                {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                className="h-1.5 rounded-full transition-all"
                                style={{
                                    width: current === idx ? 20 : 6,
                                    backgroundColor:
                                        current === idx
                                            ? "rgba(255,255,255,0.9)"
                                            : "rgba(255,255,255,0.35)",
                                    transition: reduceMotion ? "none" : "all 200ms ease",
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {pos.placement === "above" ? (
                <div
                    className="absolute left-1/2 -translate-x-1/2 rotate-45 rounded-[2px] border-b border-r border-white/10 bg-slate-900/95 ring-1 ring-black/40"
                    style={{ width: 12, height: 12, top: `calc(100% - 6px)` }}
                />
            ) : (
                <div
                    className="absolute left-1/2 -translate-x-1/2 rotate-45 rounded-[2px] border-t border-l border-white/10 bg-slate-900/95 ring-1 ring-black/40"
                    style={{ width: 12, height: 12, bottom: `calc(100% - 6px)` }}
                />
            )}
        </div>
    );

    return createPortal(tooltip, document.body);
};

export default ProjectGalleryTooltip;
