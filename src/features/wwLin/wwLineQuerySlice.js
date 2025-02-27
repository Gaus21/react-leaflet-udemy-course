import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cyclons: [],
    wwLineQuery: [],
    advisory: [],
    basin: "al",
    stormid: 'al012024',
    advisnum: '001',
    status: "idle", // idle | loading | succeeded | failed
    statusAdvis: "idle",
    error: null
};

export const fetchStormQuery = createAsyncThunk(
    "stormQuery/fetchStormQuery",
    async ({ basin }) => {
        const response = await axios.get(

            import.meta.env.VITE_BASINCICLONE_URL + `&basin=${basin}`
        );
        return response.data;
    }
);

export const fetchAdvis = createAsyncThunk(
    "advis/fetchAdvis",
    async ({ id }) => {        
        const response = await axios.get(
            import.meta.env.VITE_ADVISORY_URL + `storm_id=${id}`
        );
        return response.data;
    }
)

export const wwLineQuerySlice = createSlice({
    name: "wwLineQuery",
    initialState,
    reducers: {
        setStormId: (state, action) => {
            state.stormid = action.payload;
        },
        setAdvisNum: (state, action) => {
            state.advisnum = action.payload;
        },

        setBasin: (state, action) => {
            state.basin = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStormQuery.fulfilled, (state, action) => {
                state.cyclons = action.payload
                state.status = "succeeded";
            })
            .addCase(fetchStormQuery.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchStormQuery.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchAdvis.fulfilled, (state, action) => {
                state.advisory = action.payload
                state.statusAdvis = "succeeded";
            })
            .addCase(fetchAdvis.pending, (state, action) => {
                state.statusAdvis = "loading";
            })
            .addCase(fetchAdvis.rejected, (state, action) => {
                state.statusAdvis = "failed";
                state.error = action.error.message;
            }
            )


    },
});

export const selectedStormId = (state) => state.wwLineQuery.stormid;
export const getWwLineQuery = (state) => state.wwLineQuery;
export const getWwLineQueryStatus = (state) => state.wwLineQuery.status;
export const getWwLineQueryError = (state) => state.wwLineQuery.error;
export const advisnum = (state) => state.wwLineQuery.advisnum;

export const { setStormId, setAdvisNum, setBasin } = wwLineQuerySlice.actions;

export default wwLineQuerySlice.reducer;
