'use client';

import { useSelector } from 'react-redux';
import { selectATSScore, selectATSGrade, selectATSBreakdown } from '@/store/slices/atsSlice';
import { getScoreColor } from '@/utils/atsScoring';
import ScoreBreakdown from './ScoreBreakdown';
import SuggestionsPanel from './SuggestionsPanel';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

const ATSPanel = () => {
    const score = useSelector(selectATSScore);
    const grade = useSelector(selectATSGrade);
    const breakdown = useSelector(selectATSBreakdown);
    const [expandedView, setExpandedView] = useState('score');

    const scoreColor = getScoreColor(score);
    const scorePercentage = (score / 100) * 100;

    return (
        <div className="card-lg space-y-4">
            {/* Header */}
            <div className="section-divider pb-4">
                <h3 className="text-lg font-semibold text-[#f3f4f6]">ATS Intelligence</h3>
                <p className="text-xs text-[#9ca3af] mt-1">Real-time resume analysis</p>
            </div>

            {/* Score Display */}
            <div className="space-y-4 bg-[#1f2937] rounded-lg p-4">
                <div className="flex items-end justify-between">
                    <span className="text-sm font-medium text-[#d1d5db]">ATS Score</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold" style={{ color: scoreColor }}>
                            {score}
                        </span>
                        <span className="text-sm text-[#9ca3af]">/100</span>
                        <span 
                            className="ml-2 rounded-full px-3 py-1 text-xs font-bold text-white"
                            style={{ backgroundColor: scoreColor }}
                        >
                            {grade}
                        </span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-3 w-full overflow-hidden rounded-full bg-[#374151]">
                    <div
                        className="h-full transition-all duration-500 ease-out rounded-full"
                        style={{
                            width: `${scorePercentage}%`,
                            backgroundColor: scoreColor,
                            boxShadow: `0 0 12px ${scoreColor}40`,
                        }}
                    />
                </div>

                {/* Score Interpretation */}
                <p className="text-xs text-[#9ca3af] leading-relaxed">
                    {score >= 85 && '✨ Excellent! Your resume is highly optimized for ATS systems.'}
                    {score >= 70 && score < 85 && '✅ Good progress! A few improvements can boost compatibility.'}
                    {score >= 50 && score < 70 && '⚠️ Fair. Consider the suggestions to improve ATS scanning.'}
                    {score < 50 && '🔴 Needs improvement. Follow suggestions to strengthen your resume.'}
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 section-divider pb-4">
                <button
                    onClick={() => setExpandedView('breakdown')}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                        expandedView === 'breakdown'
                            ? 'bg-[#3b82f6] text-white'
                            : 'text-[#9ca3af] hover:text-[#d1d5db] hover:bg-[#1f2937]'
                    }`}
                >
                    Breakdown {expandedView === 'breakdown' ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <button
                    onClick={() => setExpandedView('suggestions')}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                        expandedView === 'suggestions'
                            ? 'bg-[#3b82f6] text-white'
                            : 'text-[#9ca3af] hover:text-[#d1d5db] hover:bg-[#1f2937]'
                    }`}
                >
                    Suggestions {expandedView === 'suggestions' ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>

            {/* Content */}
            <div className="space-y-3">
                {expandedView === 'breakdown' && <ScoreBreakdown breakdown={breakdown} />}
                {expandedView === 'suggestions' && <SuggestionsPanel />}
            </div>
        </div>
    );
};

export default ATSPanel;
