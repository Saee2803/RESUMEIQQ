'use client';

import { selectATSBreakdown, selectATSGrade, selectATSScore, selectATSSuggestions } from '@/store/slices/atsSlice';
import { getScoreColor } from '@/utils/atsScoring';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaArrowLeft, FaChevronDown, FaChevronUp, FaEdit, FaLightbulb } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ATSAnalysisPage = () => {
    const [mounted, setMounted] = useState(false);
    const score = useSelector(selectATSScore);
    const grade = useSelector(selectATSGrade);
    const breakdown = useSelector(selectATSBreakdown);
    const suggestions = useSelector(selectATSSuggestions);
    
    const [showBreakdown, setShowBreakdown] = useState(true);
    const [showSuggestions, setShowSuggestions] = useState(true);

    // Prevent hydration mismatch by waiting for client mount
    useEffect(() => {
        setMounted(true);
    }, []);

    const scoreColor = getScoreColor(score);

    const sections = [
        { key: 'contact', label: 'Contact Information', icon: '👤', description: 'Name, email, phone, location' },
        { key: 'summary', label: 'Professional Summary', icon: '📝', description: 'Career objectives & highlights' },
        { key: 'education', label: 'Education', icon: '🎓', description: 'Degrees, certifications, courses' },
        { key: 'experience', label: 'Work Experience', icon: '💼', description: 'Job history & achievements' },
        { key: 'projects', label: 'Projects', icon: '🚀', description: 'Personal & professional projects' },
        { key: 'skills', label: 'Technical Skills', icon: '⚙️', description: 'Tools, languages, frameworks' },
        { key: 'actionVerbs', label: 'Action Verbs', icon: '✨', description: 'Strong action-oriented language' },
        { key: 'formatting', label: 'Formatting', icon: '✓', description: 'Structure & readability' },
    ];

    const priorityConfig = {
        high: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', label: '+30 pts' },
        medium: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', label: '+15 pts' },
        low: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', label: '+5 pts' },
    };

    const getScoreMessage = () => {
        if (score >= 85) return { text: 'Excellent! Your resume is highly optimized for ATS systems.', emoji: '✨' };
        if (score >= 70) return { text: 'Good progress! A few improvements will boost your score.', emoji: '✅' };
        if (score >= 50) return { text: 'Fair. Consider the suggestions below to improve ATS compatibility.', emoji: '⚠️' };
        return { text: 'Needs improvement. Follow the suggestions to strengthen your resume.', emoji: '🔴' };
    };

    const message = getScoreMessage();

    // Show loading state until client mounts to prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <CgSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    return (
        <div className="relative min-h-[calc(100vh-80px)]">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 py-8 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/analysis"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <FaArrowLeft className="text-xs" />
                        <span>Back to Analysis</span>
                    </Link>
                    <Link
                        href="/editor"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
                    >
                        <FaEdit />
                        <span>Edit Resume</span>
                    </Link>
                </div>

                {/* Main Score Card */}
                <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 text-center space-y-6 overflow-hidden">
                    {/* Glow effect */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] opacity-30" style={{ backgroundColor: scoreColor }} />
                    
                    <div className="relative">
                        <h1 className="text-2xl font-bold text-white mb-2">ATS Compatibility Score</h1>
                        <p className="text-sm text-gray-500">Based on real ATS parsing algorithms</p>
                    </div>

                    {/* Big Score Display */}
                    <div className="relative inline-flex flex-col items-center py-8">
                        <div 
                            className="text-8xl font-bold transition-colors duration-500"
                            style={{ color: scoreColor }}
                        >
                            {score}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-lg text-gray-500">/100</span>
                            <span 
                                className="px-4 py-1.5 rounded-full text-sm font-bold text-white"
                                style={{ backgroundColor: scoreColor }}
                            >
                                {grade}
                            </span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="max-w-md mx-auto">
                        <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                            <div
                                className="h-full transition-all duration-700 ease-out rounded-full"
                                style={{
                                    width: `${score}%`,
                                    backgroundColor: scoreColor,
                                    boxShadow: `0 0 20px ${scoreColor}60`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <p className="text-gray-400 flex items-center justify-center gap-2">
                        <span className="text-xl">{message.emoji}</span>
                        <span>{message.text}</span>
                    </p>
                </div>

            {/* Score Breakdown */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
                <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="w-full flex items-center justify-between text-left"
                >
                    <div>
                        <h2 className="text-xl font-bold text-white">Section Breakdown</h2>
                        <p className="text-sm text-gray-500 mt-1">Detailed scores for each resume section</p>
                    </div>
                    {showBreakdown ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                </button>

                {showBreakdown && breakdown && (
                    <div className="mt-6 space-y-3">
                        {sections.map(({ key, label, icon, description }) => {
                            const section = breakdown[key];
                            if (!section) return null;
                            
                            const percentage = (section.score / section.maxScore) * 100;
                            const color = getScoreColor(percentage);

                            return (
                                <div key={key} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{icon}</span>
                                            <div>
                                                <span className="text-sm font-medium text-white">{label}</span>
                                                <p className="text-xs text-gray-500">{description}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-lg font-bold" style={{ color }}>
                                                {section.score}
                                            </span>
                                            <span className="text-sm text-gray-500">/{section.maxScore}</span>
                                        </div>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-white/5">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: color,
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Suggestions */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
                <button
                    onClick={() => setShowSuggestions(!showSuggestions)}
                    className="w-full flex items-center justify-between text-left"
                >
                    <div>
                        <h2 className="text-xl font-bold text-white">Improvement Suggestions</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {suggestions.length} suggestions • Potential gain: <span className="text-green-400">+{suggestions.reduce((sum, s) => sum + s.points, 0)} points</span>
                        </p>
                    </div>
                    {showSuggestions ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                </button>

                {showSuggestions && (
                    <div className="mt-6 space-y-3">
                        {suggestions.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-5xl mb-4">🎉</div>
                                <p className="text-white font-semibold text-lg">Your resume is perfect!</p>
                                <p className="text-sm text-gray-500 mt-1">No improvements needed at this time.</p>
                            </div>
                        ) : (
                            [...suggestions]
                                .sort((a, b) => {
                                    const priority = { high: 0, medium: 1, low: 2 };
                                    return priority[a.priority] - priority[b.priority];
                                })
                                .map((suggestion, idx) => {
                                    const config = priorityConfig[suggestion.priority];
                                    return (
                                        <div
                                            key={idx}
                                            className={`flex items-start gap-3 p-4 rounded-xl border ${config.bg} ${config.border}`}
                                        >
                                            <FaLightbulb className={`mt-0.5 flex-shrink-0 ${config.text}`} />
                                            <div className="flex-1">
                                                <p className="text-xs font-semibold text-gray-500 mb-1">{suggestion.category}</p>
                                                <p className="text-sm text-gray-300">{suggestion.text}</p>
                                            </div>
                                            <span className={`text-sm font-bold ${config.text}`}>
                                                +{suggestion.points}
                                            </span>
                                        </div>
                                    );
                                })
                        )}
                    </div>
                )}
            </div>

            {/* CTA */}
            <div className="text-center space-y-4 py-8">
                <Link 
                    href="/editor" 
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                    <FaEdit />
                    <span>Apply Changes in Editor</span>
                </Link>
                <p className="text-sm text-gray-500">
                    Edit your resume to see your score update in real-time
                </p>
            </div>
            </div>
        </div>
    );
};

export default ATSAnalysisPage;
