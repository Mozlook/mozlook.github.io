import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

const App: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-[radial-gradient(1200px_800px_at_100%_-10%,#1e224a_0%,#0b1020_55%,#070a12_100%)] text-slate-100">
            <div className="mx-auto flex max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
                {/* Sidebar — poza Routerem, zawsze widoczny */}
                <Sidebar />

                {/* Router obejmuje tylko część główną */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* Przykładowa trasa zgodna z ikoną Grid */}
                    <Route
                        path="/grid"
                        element={<div className="flex-1">Grid page…</div>}
                    />
                </Routes>
            </div>
        </div>
    );
};

export default App;
