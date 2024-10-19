import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Movie } from "@/types/movie";
import { MovieDetails } from "@/types/movieDetail";

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (id: number) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    return data;
  }
);

const movieDetailSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [] as Movie[],
    loading: false,
    error: null as string | null,
    movieDetail: {} as MovieDetails,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetail = action.payload;
        state.error = null;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default movieDetailSlice.reducer;
