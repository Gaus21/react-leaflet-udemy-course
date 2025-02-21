import { configureStore } from "@reduxjs/toolkit";
import breakPointsReducer from "../features/breakpoints/breakPointsSlice";

export const store = configureStore({
    reducer: {
        breakpoints: breakPointsReducer,
    }
})