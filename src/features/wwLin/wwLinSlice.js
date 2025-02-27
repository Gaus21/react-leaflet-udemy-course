import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    wwLin: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null
};

export const fetchWwLin = createAsyncThunk(
    "wwLin/fetchWwLin",
    async ({id, advisnum}) => {
        console.log( import.meta.env.VITE_WWLIN_URL +`&CQL_FILTER=stormid='${id}'and advisnum='${advisnum}'`);
        
        const response = await axios.get(
            import.meta.env.VITE_WWLIN_URL +`&CQL_FILTER=stormid='${id}'and advisnum='${advisnum}'`
        );
        return response.data;
    }
);

export const wwLinSlice = createSlice({
    name: "wwLin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWwLin.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(fetchWwLin.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchWwLin.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

    },
});

export const getWwLin = (state) => state.wwLin;
export const getWwLinStatus = (state) => state.wwLin.status;
export const getWwLinError = (state) => state.wwLin.error;

export default wwLinSlice.reducer;
