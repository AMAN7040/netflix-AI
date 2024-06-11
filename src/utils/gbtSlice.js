import { createSlice } from "@reduxjs/toolkit";

const gbtSlice = createSlice({
    name: 'gbt',
    initialState: {
        showGbtSearch : false,
        movieNames: null,
        movieContent: null,

    },
    reducers: {
        toggleGbtSearch: (state,action) => {
            state.showGbtSearch = !state.showGbtSearch ;
        },
        addAiMovies: (state, action)=>{
           const {movieContent, movieNames} = action.payload;
           state.movieContent = movieContent;
           state.movieNames = movieNames;
        }
    }
});

export const {toggleGbtSearch, addAiMovies} = gbtSlice.actions;

export default gbtSlice.reducer;