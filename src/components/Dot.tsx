import React from "react";

type DotProps = {
    className?: string;
};

const Dot: React.FC<DotProps> = ({ className = "" }) => (
    <span className={`inline-block h-2 w-2 rounded-full ${className}`} />
);

export default Dot;
