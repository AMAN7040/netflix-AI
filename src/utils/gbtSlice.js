import { createSlice } from "@reduxjs/toolkit";

const gbtSlice = createSlice({
    name: 'gbt',
    initialState: {
        showGbtSearch : false
    },
    reducers: {
        toggleGbtSearch: (state,action) => {
            state.showGbtSearch = !state.showGbtSearch ;
        }
    }
});

export const {toggleGbtSearch} = gbtSlice.actions;

export default gbtSlice.reducer;