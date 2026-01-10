'use client';

import {
    selectJDAnalysisResults,
    selectJDError,
    selectJobDescription,
    updateJobDescription,
} from '@/store/slices/jdSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaArrowLeft, FaCheck, FaChevronDown, FaChevronUp, FaEdit, FaExclamationTriangle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const JDMatchPage = () => {
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();
    const jobDescription = useSelector(selectJobDescription);
    const analysisResults = useSelector(selectJDAnalysisResults);
    const error = useSelector(selectJDError);
    const [showSuggestions, setShowSuggestions] = useState(true);

    // Prevent hydration mismatch by waiting for client mount
    useEffect(() => {
        setMounted(true);
    }, []);

    const {
        matchPercentage = 0,
        matchedKeywords = {},
        missingKeywords = {},
        matchedCount = 0,
        totalJDKeywords = 0,
        suggestions = [],
    } = analysisResults || {};

    const handleJDChange = (e) => {
        dispatch(updateJobDescription({ jobDescription: e.target.value }));
    };

    const matchedArray = Object.keys(matchedKeywords)
        .sort((a, b) => matchedKeywords[b].jdFreq - matchedKeywords[a].jdFreq);

    const missingArray = Object.keys(missingKeywords)
        .sort((a, b) => missingKeywords[b] - missingKeywords[a]);

    const getMatchColor = () => {
        if (matchPercentage >= 80) return '#22c55e';
        if (matchPercentage >= 60) return '#f59e0b';
        if (matchPercentage >= 40) return '#f97316';
        return '#ef4444';
    };

    const getMatchGrade = () => {
        if (matchPercentage >= 80) return { text: 'Excellent Match', emoji: '🎯' };
        if (matchPercentage >= 60) return { text: 'Good Match', emoji: '✅' };
        if (matchPercentage >= 40) return { text: 'Fair Match', emoji: '⚠️' };
        return { text: 'Poor Match', emoji: '🔴' };
    };

    const gradeInfo = getMatchGrade();

    // Show loading state until client mounts to prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <CgSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Background Effects */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-float-delayed" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between">
                <Link
                    href="/analysis"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                    <FaArrowLeft className="text-xs" />
                    <span>Back to Analysis</span>
                </Link>
                <Link
                    href="/editor"
                    className="px-5 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                    <FaEdit />
                    <span>Edit Resume</span>
                </Link>
            </div>

            {/* Title */}
            <div className="text-center space-y-3">
                <h1 className="text-4xl font-bold text-white">Job Description Match</h1>
                <p className="text-gray-400 text-lg">Compare your resume against any job posting to optimize your application</p>
            </div>

            {/* JD Input Card */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-2">Paste Job Description</h2>
                <p className="text-sm text-gray-500 mb-4">
                    Copy and paste the job description to analyze keyword matching
                </p>
                <textarea
                    value={jobDescription}
                    onChange={handleJDChange}
                    rows={8}
                    placeholder="Paste the complete job description here...

Example:
We are looking for a Senior Software Engineer with experience in React, Node.js, and cloud technologies..."
                    className="w-full resize-none rounded-xl bg-white/[0.03] border border-white/[0.08] p-4 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 rounded-lg bg-red-900/30 border border-red-500/40 flex items-center gap-3">
                    <FaExclamationTriangle className="text-red-400" />
                    <p className="text-red-300 text-sm">{error}</p>
                </div>
            )}

            {/* Results - Only show when JD is provided */}
            {jobDescription && !error && (
                <>
                    {/* Score Card */}
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 text-center relative overflow-hidden">
                        {/* Glow Effect */}
                        <div 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] opacity-30"
                            style={{ backgroundColor: getMatchColor() }}
                        />
                        
                        <h2 className="text-xl font-bold text-white mb-6 relative">Match Score</h2>
                        
                        <div className="relative inline-flex flex-col items-center py-4">
                            <div 
                                className="text-8xl font-bold animate-pulse-glow"
                                style={{ color: getMatchColor() }}
                            >
                                {matchPercentage}%
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <span className="text-2xl">{gradeInfo.emoji}</span>
                                <span 
                                    className="text-xl font-semibold"
                                    style={{ color: getMatchColor() }}
                                >
                                    {gradeInfo.text}
                                </span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="max-w-md mx-auto mt-6 relative">
                            <div className="h-3 w-full overflow-hidden rounded-full bg-white/[0.05]">
                                <div
                                    className="h-full transition-all duration-700 ease-out rounded-full"
                                    style={{
                                        width: `${matchPercentage}%`,
                                        backgroundColor: getMatchColor(),
                                        boxShadow: `0 0 20px ${getMatchColor()}`,
                                    }}
                                />
                            </div>
                            <p className="text-sm text-gray-400 mt-3">
                                <span className="text-white font-semibold">{matchedCount}</span> of <span className="text-white font-semibold">{totalJDKeywords}</span> keywords matched
                            </p>
                        </div>
                    </div>

                    {/* Keywords Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Matched Keywords */}
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 rounded-lg bg-green-500/20">
                                    <FaCheck className="text-green-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Matched Keywords</h3>
                                <span className="ml-auto px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">{matchedArray.length}</span>
                            </div>
                            
                            {matchedArray.length === 0 ? (
                                <p className="text-sm text-gray-500 py-4 text-center">No matching keywords found</p>
                            ) : (
                                <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                                    {matchedArray.map(keyword => (
                                        <span
                                            key={keyword}
                                            className="px-3 py-1.5 text-sm rounded-lg bg-green-500/10 text-green-300 border border-green-500/20 hover:bg-green-500/20 transition-colors"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Missing Keywords */}
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 rounded-lg bg-red-500/20">
                                    <FaExclamationTriangle className="text-red-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Missing Keywords</h3>
                                <span className="ml-auto px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-sm font-medium">{missingArray.length}</span>
                            </div>
                            
                            {missingArray.length === 0 ? (
                                <p className="text-sm text-green-400 py-4 text-center">🎉 All keywords covered!</p>
                            ) : (
                                <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                                    {missingArray.map(keyword => (
                                        <span
                                            key={keyword}
                                            className="px-3 py-1.5 text-sm rounded-lg bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
                            <button
                                onClick={() => setShowSuggestions(!showSuggestions)}
                                className="w-full flex items-center justify-between text-left"
                            >
                                <div>
                                    <h2 className="text-xl font-bold text-white">How to Improve Your Match</h2>
                                    <p className="text-sm text-gray-500 mt-1">{suggestions.length} actionable suggestions</p>
                                </div>
                                {showSuggestions ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                            </button>

                            {showSuggestions && (
                                <div className="mt-6 space-y-3">
                                    {[...suggestions]
                                        .sort((a, b) => {
                                            const p = { high: 0, medium: 1, low: 2 };
                                            return p[a.priority] - p[b.priority];
                                        })
                                        .map((suggestion, idx) => (
                                            <div
                                                key={idx}
                                                className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-1 hover:bg-blue-500/10 transition-colors"
                                            >
                                                <p className="text-sm font-medium text-gray-200">{suggestion.text}</p>
                                                <p className="text-xs text-blue-400">→ {suggestion.action}</p>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tips Card */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">💡 Pro Tips</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-400">•</span>
                                <span>Add missing keywords naturally to your Skills or Experience sections</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-400">•</span>
                                <span>Use the exact terminology from the job description</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-400">•</span>
                                <span>Aim for at least 60% keyword match for better ATS compatibility</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-400">•</span>
                                <span>Don't keyword-stuff — keep descriptions authentic and relevant</span>
                            </li>
                        </ul>
                    </div>
                </>
            )}

            {/* Empty State */}
            {!jobDescription && (
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl text-center py-16">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-xl font-bold text-white mb-2">Paste a Job Description to Start</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Copy the job description from any job posting and paste it above.
                        We'll analyze how well your resume matches the requirements.
                    </p>
                </div>
            )}

            {/* CTA */}
            <div className="text-center space-y-4 py-8">
                <Link 
                    href="/editor" 
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                    <FaEdit />
                    <span>Apply Keywords in Editor</span>
                </Link>
                <p className="text-sm text-gray-500">
                    Edit your resume to add missing keywords and improve your match score
                </p>
            </div>
        </div>
    );
};

export default JDMatchPage;
