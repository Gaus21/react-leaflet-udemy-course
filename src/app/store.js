import { configureStore } from "@reduxjs/toolkit";
import breakPointsReducer from "../features/breakpoints/breakPointsSlice";
import munReducer from "../features/mun/munSlice";
import wwLinReducer from "../features/wwLin/wwLinSlice";
import wwLineQueryReducer  from "../features/wwLin/wwLineQuerySlice";

export const store = configureStore({
    reducer: {
        breakpoints: breakPointsReducer,
        mun: munReducer,
        wwLin: wwLinReducer,
        wwLineQuery: wwLineQueryReducer

    }
})