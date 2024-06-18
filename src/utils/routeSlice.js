import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
    name: 'route',
    initialState: {
      currentRoute : 'browse',
    },
    reducers: {
      updateRoute : (state, action) => {
        state.currentRoute =  action.payload;
      },

      removeRoute: (state,action) => {
        return null;
      }
    }
});

export const {updateRoute, removeRoute} = routeSlice.actions;

export default routeSlice.reducer;