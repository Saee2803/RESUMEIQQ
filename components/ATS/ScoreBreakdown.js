'use client';

import { getScoreColor } from '@/utils/atsScoring';

/**
 * Score Breakdown Component
 * Shows detailed scores for each section
 */
const ScoreBreakdown = ({ breakdown }) => {
    const sections = [
        { key: 'contact', label: 'Contact Info', icon: '👤' },
        { key: 'summary', label: 'Professional Summary', icon: '📝' },
        { key: 'education', label: 'Education', icon: '🎓' },
        { key: 'experience', label: 'Experience', icon: '💼' },
        { key: 'projects', label: 'Projects', icon: '🚀' },
        { key: 'skills', label: 'Skills', icon: '⚙️' },
        { key: 'actionVerbs', label: 'Action Verbs', icon: '✨' },
        { key: 'formatting', label: 'Formatting', icon: '✓' },
    ];

    return (
        <div className="space-y-2 py-3">
            {sections.map(({ key, label, icon }) => {
                const section = breakdown[key];
                const percentage = (section.score / section.maxScore) * 100;
                const color = getScoreColor((section.score / section.maxScore) * 100);

                return (
                    <div key={key} className="space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-300">
                                {icon} {label}
                            </span>
                            <span className="text-sm font-semibold" style={{ color }}>
                                {section.score}/{section.maxScore}
                            </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-gray-600/50">
                            <div
                                className="h-full rounded-full transition-all duration-300"
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
    );
};

export default ScoreBreakdown;
