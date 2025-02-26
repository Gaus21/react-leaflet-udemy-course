import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    wwLineQuery: [],
    stormid:'al022024',
    status: "idle", // idle | loading | succeeded | failed
    error: null
};


export const fetchWwLineQuery = createAsyncThunk(
    "wwLineQuery/fetchWwLineQuery",
    async () => {
       
        const response = await axios.get(
            import.meta.env.VITE_WWLINEQUERY_URL
        );
        return response.data;
    }
);

export const wwLineQuerySlice = createSlice({
    name: "wwLineQuery",
    initialState,
    reducers: {
        setStormId: (state, action) => {
            state.stormid = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWwLineQuery.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(fetchWwLineQuery.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchWwLineQuery.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

    },
});

export const selectedStormId = (state) => state.wwLineQuery.stormid;
export const getWwLineQuery = (state) => state.wwLineQuery;
export const getWwLineQueryStatus = (state) => state.wwLineQuery.status;
export const getWwLineQueryError = (state) => state.wwLineQuery.error;

export const { setStormId } = wwLineQuerySlice.actions;

export default wwLineQuerySlice.reducer;
