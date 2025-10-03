import { getProjectImages } from "@/helper";
import type { Project } from "@/types/project";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type ProjectGalleryTooltipProps = {
    project: Project;
    intervalMs?: number;
    anchorRef: React.RefObject<HTMLElement>;
};

const ProjectGalleryTooltip: React.FC<ProjectGalleryTooltipProps> = ({
    project,
    intervalMs = 2000,
    anchorRef,
}) => {
    const images = useMemo(() => getProjectImages(project.slug), [project.slug]);
    const [current, setCurrent] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });

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
        const updatePosition = () => {
            if (!anchorRef.current) return;
            const rect = anchorRef.current.getBoundingClientRect();
            setPosition({
                x: rect.left + rect.width / 2,
                y: rect.top,
            });
        };

        updatePosition();
        window.addEventListener("scroll", updatePosition);
        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("scroll", updatePosition);
            window.removeEventListener("resize", updatePosition);
        };
    }, [anchorRef]);

    if (!images.length) return null;

    const tooltip = (
        <div
            className="pointer-events-none fixed z-[9999]"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: "translate(-50%, calc(-100% - 16px))",
            }}
        >
            <div className="w-100 h-72 rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl ring-1 ring-black/40 backdrop-blur">
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`${project.title} preview ${idx + 1}`}
                            className="absolute inset-0 h-full w-full rounded-lg object-cover transition-opacity duration-500"
                            style={{
                                opacity: current === idx ? 1 : 0,
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
                                className="h-1.5 rounded-full transition-all duration-300"
                                style={{
                                    width: current === idx ? "20px" : "6px",
                                    backgroundColor:
                                        current === idx
                                            ? "rgba(255,255,255,0.9)"
                                            : "rgba(255,255,255,0.3)",
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -mt-1.5 rotate-45 rounded-[2px] border-b border-r border-white/10 bg-slate-900/95 ring-1 ring-black/40" />
        </div>
    );

    return createPortal(tooltip, document.body);
};

export default ProjectGalleryTooltip;
