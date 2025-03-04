import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMun = createAsyncThunk(
    "mun/fetchMun",
    async ({ id, selectValue }) => {
        
        const response = await axios.get(
            import.meta.env.VITE_MUN_URL + `&viewparams=storm:${id};advis:${selectValue}`
        );
       
      return response.data;

    }
);

export const munSlice = createSlice({
    name: "mun",
    initialState: {
        mun: [],
        status: "idle", // idle | loading | succeeded | failed
        error: null
    },
    reducers: {
        removeMun: (state, action) => {
            state.mun = state.mun.filter(mun => mun.properties.id_bp !== action.payload.id);
        },
        removeAllMun: (state) => {
            state.mun = [];
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMun.fulfilled, (state, action) => {
                state.mun = action.payload
                state.status = "succeeded";

            })
            .addCase(fetchMun.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchMun.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const getMunData = (state) => state.mun;
export const getMunStatus = (state) => state.mun.status;
export const getMunError = (state) => state.mun.error;

export const { removeMun, removeAllMun } = munSlice.actions;

export default munSlice.reducer;