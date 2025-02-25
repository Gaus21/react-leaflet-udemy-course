import { configureStore } from "@reduxjs/toolkit";
import breakPointsReducer from "../features/breakpoints/breakPointsSlice";
import munReducer  from "../features/mun/munSlice";

export const store = configureStore({
    reducer: {
        breakpoints: breakPointsReducer,
        mun: munReducer
    }
})