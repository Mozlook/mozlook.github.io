import React, { useEffect, useState } from "react";
import { common, createStarryNight } from "@wooorm/starry-night";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

type StarryInstance = Awaited<ReturnType<typeof createStarryNight>>;

type CodeBlockProps = {
    code: string;
    language: string;
    className?: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({
    code,
    language,
    className = "",
}) => {
    const [starry, setStarry] = useState<StarryInstance | null>(null);

    useEffect(() => {
        let mounted = true;
        createStarryNight(common)
            .then((inst) => {
                if (mounted) setStarry(inst);
            })
            .catch(console.error);
        return () => {
            mounted = false;
        };
    }, []);

    if (!starry) {
        return (
            <pre className={`font-mono text-sm leading-6 p-4 ${className}`}>
                <code>{code}</code>
            </pre>
        );
    }

    const scope =
        starry.flagToScope(language) ||
        starry.flagToScope(`.${language}`) ||
        "source";

    const tree = starry.highlight(code, scope);
    const highlighted = toJsxRuntime(tree, { Fragment, jsx, jsxs });

    return (
        <div
            className={`rounded-2xl border border-white/10 bg-slate-900/40 overflow-auto ${className}`}
        >
            <pre className="font-mono text-sm leading-6 p-4">
                <code>{highlighted}</code>
            </pre>
        </div>
    );
};

export default CodeBlock;
