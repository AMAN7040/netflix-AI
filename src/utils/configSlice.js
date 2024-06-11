import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: 'config',
    initialState: {
        lang: 'en',
    },
    reducers: {
        languageChange: (state, action) => {
            state.lang = action.payload;
        }
    },
});

export const {languageChange} = configSlice.actions;

export default configSlice.reducer;