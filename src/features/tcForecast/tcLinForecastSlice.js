import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLinForecast = createAsyncThunk(
    "linForecast/fetchLinForecast",
    async ({ id, advis }) => {
       
        
        const response = await axios.get(
            `${import.meta.env.VITE_TCfC_URL}&CQL_FILTER=storm_id='${id}'and adv_num='${advis}'&typeName=tropical_cyclone:tc_lin`
        );
        return response.data;
    }
);

export const tcLinForecastSlice = createSlice({
    name: "linForecast",
    initialState: {
        linForecast: [],
        status: "idle", // idle | loading | succeeded | failed
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLinForecast.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchLinForecast.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.linForecast = action.payload.features;
            })
            .addCase(fetchLinForecast.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

const getLinForecast = (state) => state.linForecast;
export default tcLinForecastSlice.reducer;