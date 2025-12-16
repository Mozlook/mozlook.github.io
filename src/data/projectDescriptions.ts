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
  crypticquest: {
    overview:
      "CryptoQuest is a coding-puzzle web app with authentication and per-user progress tracking.",
    features: [
      "User registration and token-based login",
      "Per-user puzzle progress and resume",
      "Answer submission with server-side validation",
      "Frontend integration via a clean REST API",
      "Issue/bug reporting endpoint with file upload",
    ],
    architecture: {
      backend:
        "Django + Django REST Framework on PostgreSQL with a custom User model that stores a numeric progress counter.",
      frontend:
        "React + Vite app using axios; tokens stored in sessionStorage for authenticated requests.",
      communication:
        "JSON REST over HTTPS (Authorization: 'Token <token>'); optional CSRF cookie flow for cookie-based requests.",
    },
    technical: [
      "Endpoints include: /api/sprawdz-progres (GET) and /api/sprawdz-odpowiedz (POST) for progress & answer checks",
      "Anonymous answer checks supported; authenticated users get persisted progress increments",
      "Multipart form handling for issue reports (/api/bledy)",
      "React.lazy + Suspense used for dynamic puzzle loading on the frontend",
      "CORS setup for local dev (e.g., http://localhost:3000)",
    ],
  },
  pomodoro: {
    overview:
      "A client-side Pomodoro timer with a to-do list and a built-in lo-fi/ambient/jazz music player powered by YouTube livestreams.",
    features: [
      "Pomodoro timer with configurable focus/short/long break durations",
      "Editable to-do list (add / edit / remove tasks)",
      "Music player using curated YouTube livestreams",
      "Settings panel for theme, font, volume, and durations",
      "LocalStorage persistence for user data and preferences",
    ],
    architecture: {
      backend:
        "None — fully client-side. State and preferences are stored in LocalStorage.",
      frontend:
        "React + Vite + TypeScript + Tailwind CSS; key components: PomodoroTimer.tsx, TodoList.tsx, SettingsPanel.tsx, MusicPlayer.tsx.",
      communication:
        "YouTube IFrame API via the react-youtube package; no server API calls.",
    },
    technical: [
      "TypeScript-first codebase (dominant language in repo)",
      "Runs locally with Vite dev server (npm run dev) on http://localhost:5173",
      "Curated music sources (lo-fi / ambient / jazz radio streams)",
      "Configurable UI (theme, fonts) with persistent settings",
      "Simple, modular component structure for timer, tasks, settings, and player",
    ],
  },
  truthordare: {
    overview:
      "A browser-based party game inspired by truth-or-dare, with multiple difficulty packs and a shot-based penalty system for players.",
    features: [
      "Two game modes: Normal (no scoring) and Party (turn-based with scoring and penalties)",
      "Configurable question/task packs: normal, hard, and hardcore (mix-and-match)",
      "Party creator to add, reorder, and remove players",
      "Dynamic questions/tasks with {target} placeholder replaced by a random player name",
      "End-of-game scoreboard showing completed tasks and total shots per player",
      "Mobile-friendly dark UI with card-based layout and red accent styling",
    ],
    architecture: {
      backend:
        "None — fully client-side. Game state (players, scoreboard, selected packs) is stored in React state only.",
      frontend:
        "React + Vite + TypeScript + Tailwind CSS; key components: CreateGame (setup), DisplayQuestion (game loop), QuestionCard (question view), Scoreboard (results), InfoBox (rules modal).",
      communication:
        "No external APIs or server calls — all questions and tasks are stored locally in TypeScript resource files.",
    },
    technical: [
      "TypeScript-first codebase with explicit models for GameMode, GameState, QuestionsPackage, ScoreEntry, and Scoreboard",
      "Question pool built from static resources (questions.ts and tasks.ts) filtered by enabled packs",
      "Randomized player selection and question drawing, including `{target}` substitution logic",
      "Tailwind CSS 4 used via @tailwindcss/vite for utility-first styling and responsive layout",
    ],
  },
};
