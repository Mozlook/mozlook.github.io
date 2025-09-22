import React from "react";

type SidebarIconProps = {
    children: React.ReactNode;
};

const SidebarIcon: React.FC<SidebarIconProps> = ({ children }) => (
    <div className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] ring-1 ring-black/20 transition hover:bg-white/10">
        {children}
    </div>
);

export default SidebarIcon;
