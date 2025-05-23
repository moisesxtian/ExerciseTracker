import React from "react";

export default function Navbar() {
    return (
        console.log("Navbar component rendered"),
        <div>
            <nav className="bg-gradient-to-r from-[#232d23] to-[#1b2b1b] text-[#2ee96b] px-8 py-4 flex items-center shadow-md">
                <a href="/" className="flex items-center font-bold text-2xl tracking-wide text-[#2ee96b] no-underline">
                    <span className="w-9 h-9 mr-3 inline-block">
                        {/* Improved dumbbell SVG icon with centered horizontal bar */}
                        <svg viewBox="0 0 32 32" fill="none">
                            <rect x="2" y="13" width="4" height="15" rx="1" fill="#2ee96b"/>
                            <rect x="26" y="13" width="4" height="15" rx="1" fill="#2ee96b"/>
                            {/* Centered horizontal bar */}
                            <rect x="8" y="18" width="16" height="3" rx="1" fill="#2ee96b" />
                        </svg>
                    </span>
                    ExerciseTracker
                </a>
            </nav>
        </div>
    );
}
