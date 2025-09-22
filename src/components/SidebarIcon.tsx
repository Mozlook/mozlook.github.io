type SidebarIconProps = {
    children: React.ReactNode;
};

const SidebarIcon: React.FC<SidebarIconProps> = ({ children }) => (
    <div className="group relative flex h-6 w-6 items-center justify-center rounded-xl transition">
        {children}
    </div>
);
export default SidebarIcon;
