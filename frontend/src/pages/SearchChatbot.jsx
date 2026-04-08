import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { motion, AnimatePresence } from "framer-motion";

const SearchChatbot = () => {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([
        { type: "bot", content: "Hi! I'm your Interview Assistant. Search for any topic like 'frontend', 'react', or 'node' to get interview questions!" }
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const categories = [
        { label: "Frontend", value: "frontend" },
        { label: "MERN Stack", value: "mern" },
        { label: "Web Dev", value: "web development" },
        { label: "Java Full Stack", value: "java" },
        { label: "App Dev", value: "app developer" }
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const performSearch = async (searchTerm) => {
        if (!searchTerm.trim()) return;

        const userMsg = { type: "user", content: searchTerm };
        setMessages(prev => [...prev, userMsg]);
        setLoading(true);

        try {
            const res = await axiosInstance.get(`${API_PATHS.QUESTIONS.SEARCH}?topic=${searchTerm}`);
            const questions = res.data.questions;

            if (questions && questions.length > 0) {
                const botMsg = {
                    type: "bot",
                    content: `I found ${questions.length} premium questions for "${searchTerm}":`,
                    questions: questions
                };
                setMessages(prev => [...prev, botMsg]);
            } else {
                setMessages(prev => [...prev, { type: "bot", content: `No matching questions found for "${searchTerm}". Try selecting a category below.` }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { type: "bot", content: "System connection error. Please verify database connectivity." }]);
        } finally {
            setLoading(false);
            setQuery("");
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        performSearch(query);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto p-4">
            <header className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                        Qspiders AI
                    </h1>
                    <p className="text-gray-500 text-sm">Enhanced Recruitment & Preparation System</p>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar">
                <AnimatePresence>
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                                msg.type === "user" 
                                ? "bg-gray-900 text-white rounded-tr-none" 
                                : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                            }`}>
                                <p className="text-sm md:text-base leading-relaxed">{msg.content}</p>
                                
                                {msg.questions && (
                                    <div className="mt-4 space-y-4">
                                        {msg.questions.map((q, qIdx) => (
                                            <div key={qIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                                                        q.difficulty === 'Hard' ? 'bg-red-50 text-red-600' : 
                                                        q.difficulty === 'Medium' ? 'bg-orange-50 text-orange-600' : 
                                                        'bg-emerald-50 text-emerald-600'
                                                    }`}>
                                                        {q.difficulty}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 font-mono">ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                                                </div>
                                                <p className="font-bold text-slate-800 text-sm mb-3">Q: {q.question}</p>
                                                <div className="bg-white p-3 rounded-lg border border-slate-100 text-slate-600 text-xs italic leading-relaxed">
                                                    <span className="font-bold text-slate-400 mr-1">R:</span> {q.answer}
                                                </div>
                                                <button className="w-full mt-3 py-2 text-[10px] text-slate-400 font-semibold border-t border-slate-100 group-hover:text-orange-500 transition-colors uppercase tracking-widest">
                                                    View Detailed Methodology
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white border p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
                            <span className="text-xs text-slate-400 font-medium animate-pulse">Analyzing requirement...</span>
                            <div className="flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-75"></div>
                                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => performSearch(cat.value)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50 transition-all shadow-sm"
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSearch} className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Describe the role or topic (e.g., 'Senior MERN Developer')..."
                    className="w-full p-4 pr-16 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm transition-all group-hover:border-gray-300"
                />
                <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-2.5 rounded-xl hover:bg-black disabled:opacity-50 transition shadow-lg group-hover:scale-105 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
            </form>
        </div>
    );
};

export default SearchChatbot;
