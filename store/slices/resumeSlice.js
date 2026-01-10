import { createSlice } from '@reduxjs/toolkit';

const createDefaultResume = () => ({
    contact: {},
    summary: {},
    education: [],
    experience: [],
    projects: [],
    skills: {},
    certificates: [],
    languages: [],
    saved: false,
});

const resumeSlice = createSlice({
    name: 'resume',
    initialState: createDefaultResume(),

    reducers: {
        updateResumeValue: (state, action) => {
            const { tab, name, value, index } = action.payload;

            if (index !== undefined && index !== null) {
                state[tab][index][name] = value;
            } else {
                state[tab][name] = value;
            }

            state.saved = false;
        },

        addNewIndex: (state, action) => {
            const { tab } = action.payload;
            state[tab].push({});
            state.saved = false;
        },

        deleteIndex: (state, action) => {
            const { index, tab } = action.payload;
            state[tab].splice(index, 1);
            state.saved = false;
        },

        moveIndex: (state, action) => {
            const { index, tab, dir } = action.payload;
            const newIndex = dir === 'up' ? index - 1 : index + 1;

            if (newIndex < 0 || newIndex >= state[tab].length) return;

            const temp = state[tab][index];
            state[tab][index] = state[tab][newIndex];
            state[tab][newIndex] = temp;
            state.saved = false;
        },

        saveResume: state => {
            state.saved = true;
        },

        // ✅ RESET FIX
        resetResume: () => createDefaultResume(),
    },
});

export const {
    updateResumeValue,
    addNewIndex,
    deleteIndex,
    moveIndex,
    saveResume,
    resetResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
