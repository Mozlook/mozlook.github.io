type ImagesRollProps = {
    images: string[];
    activeIndex: number;
    onSelect: (i: number) => void;
};

const ImagesRoll: React.FC<ImagesRollProps> = ({
    images,
    activeIndex,
    onSelect,
}) => {
    return (
        <div
            className="overflow-x-auto pt-1"
            style={{
                maskImage:
                    "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
                WebkitMaskImage:
                    "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
            }}
        >
            <div className="mx-auto flex max-w-[90vw] justify-center gap-3 px-1">
                {images.map((src, i) => (
                    <button
                        key={src}
                        onClick={() => onSelect(i)}
                        className={`shrink-0 overflow-hidden rounded-xl border transition ${i === activeIndex
                                ? "border-cyan-400 ring-2 ring-cyan-400 shadow-md"
                                : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/20"
                            }`}
                        title={`image ${i + 1}`}
                    >
                        <img
                            src={src}
                            alt={`thumb-${i + 1}`}
                            className="h-16 w-24 object-cover"
                            draggable={false}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ImagesRoll;
