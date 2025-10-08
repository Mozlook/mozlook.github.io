import type { ProjectStatus } from "@/types/project";

const STATUS_STYLES: Record<
    ProjectStatus,
    { label: string; badge: string; dot: string }
> = {
    finished: {
        label: "Finished",
        badge:
            "border-emerald-400/30 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/15",
        dot: "bg-emerald-400",
    },
    maintained: {
        label: "Maintained",
        badge: "border-sky-400/30 bg-sky-400/10 text-sky-200 hover:bg-sky-400/15",
        dot: "bg-sky-400",
    },
    wip: {
        label: "Work in Progress",
        badge:
            "border-amber-400/30 bg-amber-400/10 text-amber-200 hover:bg-amber-400/15",
        dot: "bg-amber-400",
    },
};

type Props = { status: ProjectStatus; className?: string };

const StatusBadge: React.FC<Props> = ({ status, className = "" }) => {
    const s = STATUS_STYLES[status];
    return (
        <span
            className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${s.badge} ${className}`}
            aria-label={`Project status: ${s.label}`}
            title={`Project status: ${s.label}`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
            {s.label}
        </span>
    );
};

export default StatusBadge;
