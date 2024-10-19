import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMoviesAPI } from "../api";
import { Movie } from "@/types/movie";
import { MoviesState } from "@/types/movie";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ query, page }: { query: string; page: number }) => {
    return await fetchMoviesAPI(query, page);
  }
);

const initialState: MoviesState = {
  movies: [],
  totalPages: 0,
  currentPage: 1,
  totalResults: 0,
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      return { ...state, ...action.payload, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalResults = action.payload.totalResults;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export const { setInitialState } = moviesSlice.actions;
export default moviesSlice.reducer;
