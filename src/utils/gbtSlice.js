import { createSlice } from "@reduxjs/toolkit";

const gbtSlice = createSlice({
  name: "gbt",
  initialState: {
    showGbtSearch: false,
    movieNames: null,
    movieContent: null,
    movieSuggestion: null,
    toggleSuggestion: false,
  },
  reducers: {
    toggleGbtSearch: (state, action) => {
      state.showGbtSearch = !state.showGbtSearch;
    },
    addAiMovies: (state, action) => {
      const { movieContent, movieNames } = action.payload;
      state.movieContent = movieContent;
      state.movieNames = movieNames;
    },
    removeAiMovies: (state, action) => {
      state.movieContent = null;
      state.movieNames = null;
    },
    showMovieSuggestion: (state, action) => {
      state.movieSuggestion = action.payload;
    },
    removeMovieSuggestion: (state, action) => {
        state.movieSuggestion = [];
    },
    setToggleSuggestion: (state, action) => {
      state.toggleSuggestion = !state.toggleSuggestion;
    },
  },
});

export const {
  toggleGbtSearch,
  addAiMovies,
  removeAiMovies,
  showMovieSuggestion,
  setToggleSuggestion,
  removeMovieSuggestion,
} = gbtSlice.actions;

export default gbtSlice.reducer;
