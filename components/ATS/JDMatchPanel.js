'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

import {
    updateJobDescription,
    selectJobDescription,
    selectJDAnalysisResults,
    selectJDError,
} from '@/store/slices/jdSlice';

const JDMatchPanel = () => {
    const dispatch = useDispatch();

    const jobDescription = useSelector(selectJobDescription);
    const analysisResults = useSelector(selectJDAnalysisResults);
    const error = useSelector(selectJDError);

    const [showDetails, setShowDetails] = useState(false);

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

    /* 🔹 Sort helpers (NO MUTATION) */
    const matchedArray = Object.keys(matchedKeywords)
        .sort((a, b) => matchedKeywords[b].jdFreq - matchedKeywords[a].jdFreq)
        .slice(0, 8);

    const missingArray = Object.keys(missingKeywords)
        .sort((a, b) => missingKeywords[b] - missingKeywords[a])
        .slice(0, 6);

    const getMatchColor = () => {
        if (matchPercentage >= 80) return '#22c55e';
        if (matchPercentage >= 60) return '#f59e0b';
        if (matchPercentage >= 40) return '#f97316';
        return '#ef4444';
    };

    const getMatchGrade = () => {
        if (matchPercentage >= 80) return 'Excellent';
        if (matchPercentage >= 60) return 'Good';
        if (matchPercentage >= 40) return 'Fair';
        return 'Poor';
    };

    return (
        <div className="space-y-4">

            {/* ================= HEADER ================= */}
            <div className="border-b border-slate-700 pb-3">
                <h3 className="text-lg font-semibold text-slate-100">
                    JD Match Analysis
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                    Optimize your resume for job descriptions
                </p>
            </div>

            {/* ================= JD INPUT ================= */}
            <div>
                <label className="block text-sm text-slate-300 mb-2">
                    Paste Job Description
                </label>
                <textarea
                    value={jobDescription}
                    onChange={handleJDChange}
                    rows={5}
                    placeholder="Paste the job description here..."
                    className="w-full resize-none rounded-md bg-slate-800 border border-slate-700 p-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* ================= ERROR ================= */}
            {error && (
                <div className="p-3 rounded-md bg-red-900/30 border border-red-500/40 text-red-300 text-xs">
                    ⚠️ {error}
                </div>
            )}

            {/* ================= SCORE ================= */}
            {jobDescription && !error && (
                <>
                    <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-end">
                            <span className="text-sm text-slate-300">
                                Job Match Score
                            </span>
                            <span
                                className="text-4xl font-bold"
                                style={{ color: getMatchColor() }}
                            >
                                {matchPercentage}%
                            </span>
                        </div>

                        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                            <div
                                className="h-full transition-all duration-500"
                                style={{
                                    width: `${matchPercentage}%`,
                                    backgroundColor: getMatchColor(),
                                }}
                            />
                        </div>

                        <div className="flex justify-between text-xs">
                            <span style={{ color: getMatchColor() }}>
                                {getMatchGrade()} Match
                            </span>
                            <span className="text-slate-400">
                                {matchedCount} / {totalJDKeywords} keywords
                            </span>
                        </div>
                    </div>

                    {/* ================= MATCHED ================= */}
                    {matchedArray.length > 0 && (
                        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                            <h4 className="text-xs font-bold text-green-400 mb-2">
                                ✓ MATCHED KEYWORDS
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {matchedArray.map(k => (
                                    <span
                                        key={k}
                                        className="px-2 py-1 text-xs rounded bg-green-500/20 text-green-300"
                                    >
                                        {k}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ================= MISSING ================= */}
                    {missingArray.length > 0 && (
                        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                            <h4 className="text-xs font-bold text-red-400 mb-2">
                                ⚠ MISSING KEYWORDS
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {missingArray.map(k => (
                                    <span
                                        key={k}
                                        className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-300"
                                    >
                                        {k}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ================= SUGGESTIONS TOGGLE ================= */}
                    {suggestions.length > 0 && (
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="w-full flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300"
                        >
                            {showDetails ? <FaChevronUp /> : <FaChevronDown />}
                            Suggestions ({suggestions.length})
                        </button>
                    )}

                    {/* ================= SUGGESTIONS LIST ================= */}
                    {showDetails && suggestions.length > 0 && (
                        <div className="bg-slate-800/60 border border-blue-500/30 rounded-lg p-3 space-y-2">
                            {[...suggestions]
                                .sort((a, b) => {
                                    const p = { high: 0, medium: 1, low: 2 };
                                    return p[a.priority] - p[b.priority];
                                })
                                .map((s, i) => (
                                    <div
                                        key={i}
                                        className="p-2 rounded text-xs bg-slate-700/60"
                                    >
                                        <p className="font-semibold text-slate-100">
                                            {s.text}
                                        </p>
                                        <p className="text-slate-400 italic">
                                            → {s.action}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    )}

                    <div className="text-xs text-slate-400 pt-2 border-t border-slate-700">
                        💡 Skills section keywords have higher ATS impact
                    </div>
                </>
            )}

            {!jobDescription && (
                <p className="text-center text-sm text-slate-400 py-4">
                    Paste a job description to analyze your resume
                </p>
            )}
        </div>
    );
};

export default JDMatchPanel;
