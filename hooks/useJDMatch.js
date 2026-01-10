import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analyzeJDMatch } from '@/utils/jdMatching';
import { updateJDAnalysis, setJDError } from '@/store/slices/jdSlice';

/**
 * Hook to calculate and update JD match analysis when resume or JD changes
 * Debounces calculations to avoid excessive re-computations
 *
 * Usage:
 * useJDMatch() // Call once in a component that wraps the editor
 */
export function useJDMatch() {
    const dispatch = useDispatch();
    const resumeData = useSelector(state => state.resume);
    const jobDescription = useSelector(state => state.jd.jobDescription);

    useEffect(() => {
        // Skip if no JD provided
        if (!jobDescription || !jobDescription.trim()) {
            return;
        }

        // Calculate JD match with 800ms debounce (slightly longer than ATS due to keyword extraction)
        const debounceTimer = setTimeout(() => {
            try {
                const result = analyzeJDMatch(jobDescription, resumeData);

                if (result.error) {
                    dispatch(setJDError({ error: result.error }));
                } else {
                    dispatch(
                        updateJDAnalysis({
                            matchPercentage: result.matchPercentage,
                            matchedKeywords: result.matchedKeywords,
                            missingKeywords: result.missingKeywords,
                            suggestions: result.suggestions,
                            matchedCount: result.matchedCount,
                            totalJDKeywords: result.totalJDKeywords,
                            timestamp: result.timestamp,
                        }),
                    );
                }
            } catch (error) {
                console.error('Error calculating JD match:', error);
                dispatch(setJDError({ error: 'Failed to analyze job description' }));
            }
        }, 800);

        return () => clearTimeout(debounceTimer);
    }, [jobDescription, resumeData, dispatch]);
}
