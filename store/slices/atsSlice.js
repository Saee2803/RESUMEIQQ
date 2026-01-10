import { createSlice } from '@reduxjs/toolkit';

const defaultATS = {
    score: 0,
    maxScore: 100,
    grade: 'F',
    breakdown: {
        contact: { score: 0, maxScore: 15, details: {} },
        summary: { score: 0, maxScore: 10, details: {} },
        education: { score: 0, maxScore: 15, details: {} },
        experience: { score: 0, maxScore: 30, details: {} },
        projects: { score: 0, maxScore: 15, details: {} },
        skills: { score: 0, maxScore: 15, details: {} },
        actionVerbs: { score: 0, maxScore: 10, details: {} },
        formatting: { score: 0, maxScore: 5, details: {} },
    },
    suggestions: [],
    timestamp: null,
    lastUpdated: null,
};

const atsSlice = createSlice({
    name: 'ats',
    initialState: defaultATS,
    reducers: {
        /**
         * Update ATS analysis results
         * Payload: { score, maxScore, breakdown, suggestions, grade }
         */
        updateATSAnalysis: (state, action) => {
            const { score, maxScore, breakdown, suggestions, grade, timestamp } = action.payload;
            state.score = score;
            state.maxScore = maxScore;
            state.breakdown = breakdown;
            state.suggestions = suggestions;
            state.grade = grade;
            state.timestamp = timestamp;
            state.lastUpdated = Date.now();
        },

        /**
         * Reset ATS to initial state
         */
        resetATS: () => defaultATS,
    },
});

export const { updateATSAnalysis, resetATS } = atsSlice.actions;

// Selectors
export const selectATSScore = state => state.ats.score;
export const selectATSGrade = state => state.ats.grade;
export const selectATSBreakdown = state => state.ats.breakdown;
export const selectATSSuggestions = state => state.ats.suggestions;
export const selectATSLastUpdated = state => state.ats.lastUpdated;
export const selectATSAnalysis = state => state.ats;

// Selector for section-specific scores
export const selectATSSectionScore = (state, section) => state.ats.breakdown[section];

export default atsSlice.reducer;
