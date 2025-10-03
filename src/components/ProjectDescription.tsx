import { projectDescriptions } from "@/data/projectDescriptions";
type ProjectDescriptionProps = { slug: string };

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ slug }) => {
    const desc = projectDescriptions[slug];
    if (!desc) return null;

    return (
        <div className="flex flex-col gap-6 text-slate-300">
            <p>{desc.overview}</p>

            <div>
                <h3 className="text-lg font-semibold text-white">Key Features</h3>
                <ul className="list-disc pl-5">
                    {desc.features.map((f, i) => (
                        <li key={i}>{f}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-white">Architecture</h3>
                <ul className="list-disc pl-5">
                    <li>{desc.architecture.backend}</li>
                    <li>{desc.architecture.frontend}</li>
                    <li>{desc.architecture.communication}</li>
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-white">
                    Technical Highlights
                </h3>
                <ul className="list-disc pl-5">
                    {desc.technical.map((t, i) => (
                        <li key={i}>{t}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProjectDescription;
