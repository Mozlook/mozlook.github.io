import ImagesRoll from "./ImagesRoll";

type ImageLightBoxProps = {
    images: string[];
    toggleIsOpen: () => void;
    activeIndex: number;
    setActiveIndex: (i: number) => void;
};

const ImageLightBox: React.FC<ImageLightBoxProps> = ({
    images,
    activeIndex,
    toggleIsOpen,
    setActiveIndex,
}) => {
    return (
        <div
            onClick={toggleIsOpen}
            className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex w-full max-w-[min(92vw,1400px)] flex-col items-center gap-4"
            >
                <img
                    src={images[activeIndex]}
                    alt={`image-${activeIndex + 1}`}
                    className="select-none rounded-xl object-contain"
                    style={{ maxHeight: "60vh", maxWidth: "70vw" }}
                    draggable={false}
                />

                <ImagesRoll
                    images={images}
                    activeIndex={activeIndex}
                    onSelect={setActiveIndex}
                />
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleIsOpen();
                }}
                className="absolute right-4 top-4 rounded-lg border border-white/10 bg-white/10 px-2.5 py-1.5 text-sm text-slate-100 hover:bg-white/20"
                aria-label="Close"
            >
                ✕
            </button>
        </div>
    );
};

export default ImageLightBox;
