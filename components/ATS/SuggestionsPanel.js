'use client';

import { useSelector } from 'react-redux';
import { selectATSSuggestions } from '@/store/slices/atsSlice';
import { FaCheck, FaTimes, FaLightbulb } from 'react-icons/fa6';

/**
 * Suggestions Panel Component
 * Shows improvement recommendations sorted by priority and impact
 */
const SuggestionsPanel = () => {
    const suggestions = useSelector(selectATSSuggestions);

    if (suggestions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center">
                <FaCheck className="mb-2 text-2xl text-green-400" />
                <p className="text-sm font-medium text-gray-300">Perfect Resume!</p>
                <p className="text-xs text-gray-500">No improvements needed at this time.</p>
            </div>
        );
    }

    const priorityConfig = {
        high: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', label: 'High Impact' },
        medium: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', label: 'Medium Impact' },
        low: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', label: 'Low Impact' },
    };

    return (
        <div className="space-y-3 py-3 max-h-[500px] overflow-y-auto">
            {suggestions.map((suggestion, idx) => {
                const config = priorityConfig[suggestion.priority];
                return (
                    <div
                        key={idx}
                        className={`space-y-2 rounded-md border ${config.bg} ${config.border} p-3 transition-colors hover:brightness-110`}
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2 flex-1">
                                <FaLightbulb className={`mt-1 flex-shrink-0 text-sm ${config.text}`} />
                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-gray-400">{suggestion.category}</p>
                                    <p className="text-sm text-gray-300">{suggestion.text}</p>
                                </div>
                            </div>
                            <span className={`whitespace-nowrap text-xs font-semibold ${config.text}`}>
                                +{suggestion.points} pts
                            </span>
                        </div>
                    </div>
                );
            })}

            {/* Summary Footer */}
            <div className="border-t border-gray-600 pt-3 mt-4">
                <p className="text-xs text-gray-500 text-center">
                    Implementing these suggestions could increase your score by up to{' '}
                    <span className="font-semibold text-primary-400">
                        {suggestions.reduce((sum, s) => sum + s.points, 0)} points
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SuggestionsPanel;
