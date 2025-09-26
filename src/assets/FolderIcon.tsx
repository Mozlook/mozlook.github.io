const FolderIcon: React.FC = () => {
    return (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-slate-400">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7h5l2 3h11v9H3V7z"
                />
            </svg>
        </div>
    );
};
export default FolderIcon;
