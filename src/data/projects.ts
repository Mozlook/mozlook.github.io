import type { Project } from "@/types/project";

export const projects: Project[] = [
    {
        id: "p1",
        title: "Spotiguess",
        slug: "spotiguess",
        headline: "Real-time music quiz with Spotify",
        href: "/projects/Spotiguess",
        preview: "https://spotiguess.mmozoluk.com",
        repo: [{ label: "Github", href: "https://github.com/Mozlook/SpotiGuess" }],
        tags: ["Go", "React", "TypeScript", "Websocket"],
        iconGradientFrom: "from-indigo-500/60",
        iconGradientTo: "to-blue-600/60",
    },
    {
        id: "p2",
        title: "CrypticQuest",
        slug: "crypticquest",
        headline: "Interactive puzzle Solving game with custom API",
        href: "/projects/CrypticQuest",
        preview: "https://crypticquest.mmozoluk.com",
        repo: [
            { label: "Frontend", href: "https://github.com/Mozlook/CryptoQuest" },
            {
                label: "Backend",
                href: "https://github.com/Mozlook/CryptoQuestBackend",
            },
        ],
        tags: ["React", "Django", "Python"],
        iconGradientFrom: "from-rose-500/60",
        iconGradientTo: "to-orange-500/60",
    },
    {
        id: "p3",
        title: "MoneyControl",
        slug: "moneycontrol",
        headline: "Finance tracking application with custom API",
        href: "/projects/MoneyControl",
        preview: "https://moneycontrol.mmozoluk.com",
        repo: [
            { label: "Frontend", href: "https://github.com/Mozlook/MoneyControl" },
            {
                label: "Backend",
                href: "https://github.com/Mozlook/MoneyControlBackend",
            },
        ],
        tags: ["React", "TailwindCSS", "Django", "Python"],
        iconGradientFrom: "from-fuchsia-500/60",
        iconGradientTo: "to-violet-600/60",
    },
    {
        id: "p4",
        title: "EnchancedPomodoro",
        slug: "pomodoro",
        headline: "Pomodoro App enchanced with music player and task list",
        href: "/projects/EnchancedPomodoro",
        preview: "https://pomodoro.mmozoluk.com",
        repo: [
            { label: "Github", href: "https://github.com/Mozlook/EnchancedPomodoro" },
        ],
        tags: ["React", "TailwindCSS", "Responsive Design"],
        iconGradientFrom: "from-emerald-500/60",
        iconGradientTo: "to-teal-600/60",
    },

    {
        id: "p5",
        title: "ProjectFive",
        slug: "spotiguess",
        headline: "Lorem ipsum dolor sit amet, consectetur",
        href: "/projects/ProjectFive",
        tags: ["Infra"],
        iconGradientFrom: "from-fuchsia-500/60",
        iconGradientTo: "to-violet-600/60",
    },
];
