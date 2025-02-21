import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        // Define a top-level state field named `map` that reducers will be responsible for
     //   map: mapReducer,
    },
    });