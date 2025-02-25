import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  breakpoints: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null
};

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
    builder
      .addCase(fetchBreakPoints.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchBreakPoints.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBreakPoints.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

  },
});

export const getBreakPoints = (state) => state.breakPoints;
export const getBreakPointsStatus = (state) => state.breakPoints.status;
export const getBreakPointsError = (state) => state.breakPoints.error;


export default breakPointsSlice.reducer;