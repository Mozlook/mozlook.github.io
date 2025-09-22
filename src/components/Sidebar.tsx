import React from "react";
import { NavLink } from "react-router-dom";
import SidebarIcon from "./SidebarIcon";

const linkBase =
    "block rounded-xl border border-white/10 bg-white/5 p-3 ring-1 ring-black/20 transition hover:bg-white/10";

const Sidebar: React.FC = () => {
    return (
        <aside className="sticky top-10 hidden shrink-0 flex-col items-center gap-4 md:flex">
            <nav className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur supports-[backdrop-filter]:bg-white/5">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? "border-white/20 bg-white/10" : ""}`
                    }
                    aria-label="Home"
                >
                    <SidebarIcon>
                        <svg
                            viewBox="0 0 24 24"
                            className="h-6 w-6 text-slate-200/80"
                            aria-hidden
                        >
                            <path fill="currentColor" d="M12 3.172 3 10v11h6v-6h6v6h6V10z" />
                        </svg>
                    </SidebarIcon>
                </NavLink>

                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? "border-white/20 bg-white/10" : ""}`
                    }
                    aria-label="Projects"
                >
                    <SidebarIcon>
                        <svg
                            viewBox="0 0 24 24"
                            className="h-6 w-6 text-slate-200/80"
                            aria-hidden
                        >
                            <path
                                fill="currentColor"
                                d="M12 3 1 9l11 6 11-6-11-6Zm0 9L1 6v3l11 6 11-6V6l-11 6Zm0 5L1 11v3l11 6 11-6v-3l-11 6Z"
                            />
                        </svg>
                    </SidebarIcon>
                </NavLink>

                <NavLink
                    to="/grid"
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? "border-white/20 bg-white/10" : ""}`
                    }
                    aria-label="Grid"
                >
                    <SidebarIcon>
                        <svg
                            viewBox="0 0 24 24"
                            className="h-6 w-6 text-slate-200/80"
                            aria-hidden
                        >
                            <path
                                fill="currentColor"
                                d="M3 3h8v8H3V3Zm10 0h8v8h-8V3ZM3 13h8v8H3v-8Zm10 0h8v8h-8v-8Z"
                            />
                        </svg>
                    </SidebarIcon>
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
