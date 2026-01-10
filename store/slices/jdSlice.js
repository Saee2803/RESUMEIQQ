import { createSlice } from '@reduxjs/toolkit';

const defaultJDState = {
    jobDescription: '',
    analysisResults: {
        matchPercentage: 0,
        matchedKeywords: {},
        missingKeywords: {},
        suggestions: [],
        matchedCount: 0,
        totalJDKeywords: 0,
    },
    timestamp: null,
    lastUpdated: null,
    error: null,
};

const jdSlice = createSlice({
    name: 'jd',
    initialState: defaultJDState,
    reducers: {
        /**
         * Update the job description text
         * Payload: { jobDescription: string }
         */
        updateJobDescription: (state, action) => {
            state.jobDescription = action.payload.jobDescription || '';
        },

        /**
         * Update JD analysis results
         * Payload: { matchPercentage, matchedKeywords, missingKeywords, suggestions, etc }
         */
        updateJDAnalysis: (state, action) => {
            const {
                matchPercentage,
                matchedKeywords,
                missingKeywords,
                suggestions,
                matchedCount,
                totalJDKeywords,
                timestamp,
            } = action.payload;

            state.analysisResults = {
                matchPercentage,
                matchedKeywords,
                missingKeywords,
                suggestions,
                matchedCount,
                totalJDKeywords,
            };

            state.timestamp = timestamp;
            state.lastUpdated = Date.now();
            state.error = null;
        },

        /**
         * Set error state
         * Payload: { error: string }
         */
        setJDError: (state, action) => {
            state.error = action.payload.error || null;
        },

        /**
         * Clear JD and analysis
         */
        clearJDMatch: () => defaultJDState,
    },
});

export const { updateJobDescription, updateJDAnalysis, setJDError, clearJDMatch } = jdSlice.actions;

// Selectors
export const selectJobDescription = state => state.jd.jobDescription;
export const selectJDAnalysisResults = state => state.jd.analysisResults;
export const selectJDMatchPercentage = state => state.jd.analysisResults.matchPercentage;
export const selectJDMatchedKeywords = state => state.jd.analysisResults.matchedKeywords;
export const selectJDMissingKeywords = state => state.jd.analysisResults.missingKeywords;
export const selectJDSuggestions = state => state.jd.analysisResults.suggestions;
export const selectJDLastUpdated = state => state.jd.lastUpdated;
export const selectJDError = state => state.jd.error;

export default jdSlice.reducer;
