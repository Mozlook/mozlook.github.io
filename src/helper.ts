const allImages = import.meta.glob("/src/assets/images/**/*.{jpg,png}", {
    eager: true,
    import: "default",
}) as Record<string, string>;

export function getProjectImages(slug: string): string[] {
    const prefix = `/src/assets/images/${slug}/`;
    return Object.entries(allImages)
        .filter(([path]) => path.startsWith(prefix))
        .map(([, url]) => url);
}
