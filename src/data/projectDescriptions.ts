import type { ProjectDescription } from "@/types/projectDescription";

export const projectDescriptions: Record<string, ProjectDescription> = {
    spotiguess: {
        overview:
            "SpotiGuess is an interactive music quiz game that blends streaming with real-time competition.",
        features: [
            "Generates quiz questions from Spotify and Last.fm",
            "Real-time multiplayer with WebSockets",
            "Room system for easy game setup",
            "Dynamic, always-fresh quiz rounds",
            "Clean, responsive interface",
        ],
        architecture: {
            backend:
                "Go backend handling game logic, WebSockets, and API integrations with Spotify + Last.fm (Redis for state).",
            frontend: "React + Vite frontend with Tailwind CSS and React Router.",
            communication:
                "WebSockets streaming questions, answers, and results live.",
        },
        technical: [
            "Duplicate-free question generation",
            "Real-time sync for multiple players",
            "Secure Spotify authentication and token handling",
            "Scalable, flexible game data model",
            "Resilient state recovery and player reconnections (WIP)",
        ],
    },
};
