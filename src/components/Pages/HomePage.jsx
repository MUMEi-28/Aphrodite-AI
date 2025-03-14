import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage()
{
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 via-red-400 to-purple-500 text-white text-center">
            <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">💖 Aphrodite AI 💖</h1>
            <p className="text-lg max-w-lg mb-8">Chat with Aphrodite, the AI-powered love assistant! Seek romantic advice, play Hangman: Love Edition, or unveil your love fortune. 💘</p>

            <div className="flex flex-wrap justify-center gap-6">
                <Link
                    to="/chat"
                    className="bg-white text-pink-600 px-6 py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300 hover:bg-pink-200 hover:scale-105"
                >
                    💬 Chat with Aphrodite
                </Link>
                <Link
                    to="/minigame"
                    className="bg-white text-purple-600 px-6 py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300 hover:bg-purple-200 hover:scale-105"
                >
                    🎮 Play Hangman: Love Edition
                </Link>
                <Link
                    to="/fortune-teller"
                    className="bg-white text-pink-600 px-6 py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300 hover:bg-pink-200 hover:scale-105"
                >
                    🔮 Reveal Your Love Fortune
                </Link>
            </div>
        </div>
    );
}
