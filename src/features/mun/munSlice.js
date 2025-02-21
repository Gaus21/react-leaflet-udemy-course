import {
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

const MUN_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(MUN_URL)
    return response.data
})
