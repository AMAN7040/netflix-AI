import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import moviesReducer from './moviesSlice';
import gbtReducer from './gbtSlice';
import configReducer from "./configSlice";
import tvShowsReducer from './tvShowSlice';
import routeReducer from './routeSlice';
import chooseReducer from './chooseSlice';
import wishlistReducer from './wishListSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer, 
        movies: moviesReducer,
        gbt: gbtReducer,
        config: configReducer,
        tvShows: tvShowsReducer,
        route: routeReducer,
        choose: chooseReducer,
        wishlist: wishlistReducer,
    },
});

export default appStore;