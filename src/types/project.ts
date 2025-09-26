export type Project = {
    id: string;
    title: string;
    desc: string;
    href?: string;
    preview?: string;
    tags?: string[];
    repo?: { label: string; href: string }[];
    iconGradientFrom?: string;
    iconGradientTo?: string;
};
