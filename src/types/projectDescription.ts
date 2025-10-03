export type ProjectDescription = {
    overview: string;
    features: string[];
    architecture: {
        backend: string;
        frontend: string;
        communication: string;
    };
    technical: string[];
};
