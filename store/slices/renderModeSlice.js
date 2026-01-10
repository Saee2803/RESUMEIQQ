import { createSlice } from '@reduxjs/toolkit';

/**
 * Redux slice for managing resume rendering mode
 * Allows toggling between:
 * - ATS Mode: Optimized for automated parsing systems
 * - RECRUITER Mode: Optimized for human readability
 *
 * This mode affects only the PDF/HTML rendering layer,
 * not the underlying resume data structure.
 */

const renderModeSlice = createSlice({
    name: 'renderMode',
    initialState: {
        mode: 'RECRUITER', // Default to RECRUITER mode
    },
    reducers: {
        /**
         * Set the rendering mode
         * @param {string} action.payload - Either 'ATS' or 'RECRUITER'
         */
        setRenderMode: (state, action) => {
            const validModes = ['ATS', 'RECRUITER'];
            if (validModes.includes(action.payload)) {
                state.mode = action.payload;
                // Persist to localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('resumeRenderMode', action.payload);
                }
            }
        },

        /**
         * Toggle between ATS and RECRUITER modes
         */
        toggleRenderMode: (state) => {
            state.mode = state.mode === 'ATS' ? 'RECRUITER' : 'ATS';
            // Persist to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('resumeRenderMode', state.mode);
            }
        },

        /**
         * Initialize mode from localStorage (called on app load)
         */
        initializeRenderMode: (state) => {
            if (typeof window !== 'undefined') {
                const savedMode = localStorage.getItem('resumeRenderMode');
                if (savedMode && ['ATS', 'RECRUITER'].includes(savedMode)) {
                    state.mode = savedMode;
                }
            }
        },
    },
});

export const { setRenderMode, toggleRenderMode, initializeRenderMode } = renderModeSlice.actions;

/**
 * Selector to get the current render mode
 */
export const selectRenderMode = (state) => state.renderMode.mode;

/**
 * Selector to check if ATS mode is active
 */
export const selectIsATSMode = (state) => state.renderMode.mode === 'ATS';

export default renderModeSlice.reducer;
