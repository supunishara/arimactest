import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("", () => {});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {},
  reducers: {},
});

export default moviesSlice.reducer;
