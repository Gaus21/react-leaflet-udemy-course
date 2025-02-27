import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchConePolygon = createAsyncThunk(
    "conePolygon/fetchConePolygon",
    async ({ id, advis }) => {
        
        const response = await axios.get(
            `${import.meta.env.VITE_TCfC_URL}&CQL_FILTER=storm_id='${id}'and adv_num='${advis}'&typeName=tropical_cyclone:tc_pgn`
        );
        return response.data;
    }
);

export const conePolygonSlice = createSlice({
    name: "conePolygon",
    initialState: {
        conePolygon: [],
        status: "idle", // idle | loading | succeeded | failed
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConePolygon.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchConePolygon.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.conePolygon = action.payload.features;
            })
            .addCase(fetchConePolygon.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

const getConePolygon = (state) => state.conePolygon;

export default conePolygonSlice.reducer;