//link
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";       
import Logo from '../assets/logo.svg?react';

export default function Navbar() {
    const { logout } = useLogout();
    const [darkMode, setDarkMode] = useState(false);
    const { user } = useAuthContext();
    // Toggle dark mode by toggling a class on the body
    const handleClick = () => {
        logout();
        console.log("Logout clicked");
    }
    const handleToggleDarkMode = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            if (newMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            return newMode;
        });
    };

    return (
        <nav className={`w-full flex items-center justify-between px-8 py-4 shadow-md transition-colors duration-300 ${darkMode ? 'bg-gradient-to-r from-[#181c1b] to-[#232d23]' : 'bg-gradient-to-r from-[#f8fafc] to-[#e8f5e9]'}`}>
            <a href="/" className="flex items-centertext-2xl tracking-wide text-pastel-navy no-underline gap-2">
                <span className={`w-9 h-9 inline-block ${darkMode ? 'text-[#2fdd86]' : 'text-[#2fdd86]'}`}>
                    <Logo className="w-11 h-11" />
                </span>
                <div className="flex items-center text-2xl">
                <span className="ml-1 font-black">Reptr</span>
                <span className="ml-1 font-extralight">- Workout Tracker</span>
                </div>
            </a>
            <div className="flex items-center gap-5">
            <button
                onClick={handleToggleDarkMode}
                className="ml-4 p-2 rounded-full border border-gray-300 bg-transparent hover:bg-pastel-green/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pastel-green/40 flex items-center justify-center"
                title="Toggle Dark Mode"
            >
                {darkMode ? (
                    // Moon icon for dark mode (less saturated, pastel-navy)
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a506b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" fill="#b8c6db" />
                    </svg>
                ) : (
                    // Sun icon for light mode (less saturated, pastel-navy)
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a506b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" fill="#b8c6db" />
                        <g stroke="#3a506b">
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </g>
                    </svg>
                )}
            </button>
            {user && (
                <div>
                <span className="text-pastel-navy font-semibold mr-4">
                    Welcome, {user && user.username}!  
                </span>
                <button
                    onClick={handleClick}
                    className="bg-pastel-green text-pastel-navy font-semibold px-4 py-2 rounded-lg hover:bg-pastel-navy hover:text-pastel-green transition-colors duration-200">
                    Logout
                </button>
                </div>
                
            )}
            {!user && (
                <Link to="/login" className="text-pastel-navy font-semibold hover:text-green-950 transition-colors duration-200">
                    Login
                </Link>
            )}
            </div>
        </nav>
    );
}
