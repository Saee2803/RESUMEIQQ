import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateATSScore, getScoreGrade } from '@/utils/atsScoring';
import { updateATSAnalysis } from '@/store/slices/atsSlice';

/**
 * Hook to calculate and update ATS analysis when resume changes
 * Debounces calculations to avoid excessive re-computations
 *
 * Usage:
 * useATSAnalysis() // Call once in a component that wraps the editor
 */
export function useATSAnalysis() {
    const dispatch = useDispatch();
    const resumeData = useSelector(state => state.resume);

    useEffect(() => {
        // Calculate ATS score with 500ms debounce
        const debounceTimer = setTimeout(() => {
            try {
                const atsResult = calculateATSScore(resumeData);
                const grade = getScoreGrade(atsResult.score);

                dispatch(
                    updateATSAnalysis({
                        score: atsResult.score,
                        maxScore: atsResult.maxScore,
                        breakdown: atsResult.breakdown,
                        suggestions: atsResult.suggestions,
                        grade,
                        timestamp: atsResult.timestamp,
                    }),
                );
            } catch (error) {
                console.error('Error calculating ATS score:', error);
            }
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [resumeData, dispatch]);
}
