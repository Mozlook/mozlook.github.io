import type { Project } from "@/types/project";
import { getProjectImages } from "@/helper";
import { useState } from "react";
import ImageLightBox from "./ImageLightBox";

type ImageGalleryProps = {
    project: Project;
};
const ImageGallery: React.FC<ImageGalleryProps> = ({ project }) => {
    const images = getProjectImages(project.slug);
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);
    if (images.length === 0) return null;

    function toggleIsOpen() {
        setIsOpen((prev) => !prev);
    }
    return (
        <div className="relative flex flex-col items-center h-full w-full group">
            {isOpen && (
                <ImageLightBox
                    images={images}
                    toggleIsOpen={toggleIsOpen}
                    activeIndex={index}
                    setActiveIndex={setIndex}
                />
            )}
            <img
                onClick={toggleIsOpen}
                src={images[index]}
                alt={`${project.title} screenshot ${index + 1}`}
                className="h-full w-full object-contain rounded-xl"
                draggable={false}
            />

            <button
                onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
                ◀
            </button>

            <button
                onClick={() => setIndex((i) => (i + 1) % images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
                ▶
            </button>

            <div className="mt-2 flex gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-2 w-2 rounded-full ${i === index ? "bg-slate-200" : "bg-slate-500/40"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
export default ImageGallery;
