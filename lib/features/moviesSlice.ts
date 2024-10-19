import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Movie } from "@/types/movie";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (search: string) => {
    const url = search
      ? `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&query=${encodeURIComponent(search)}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    return data.results;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [] as Movie[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default moviesSlice.reducer;
