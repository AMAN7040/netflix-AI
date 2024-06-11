import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import moviesReducer from './moviesSlice';
import gbtReducer from './gbtSlice';
import configReducer from "./configSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer, 
        movies: moviesReducer,
        gbt: gbtReducer,
        config: configReducer,
    },
});

export default appStore;