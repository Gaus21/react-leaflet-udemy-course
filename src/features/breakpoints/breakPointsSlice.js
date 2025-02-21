import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchBreakPoints = createAsyncThunk(
  "breakPoints/fetchBreakPoints",
  async () => {
    const response = await axios.get(
      import.meta.env.VITE_BREAKPOINTS_URL
    );
    return response.data;
  }
);  

export const breakPointsSlice = createSlice({
    name: "breakPoints",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBreakPoints.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const selectBreakPoints = (state) => state.breakPoints;
export default breakPointsSlice.reducer;