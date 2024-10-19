import moviesReducer, {
  setInitialState,
  fetchMovies,
} from "@/lib/features/moviesSlice";

describe("moviesSlice", () => {
  const initialState = {
    movies: [],
    totalPages: 0,
    currentPage: 1,
    totalResults: 0,
    loading: false,
    error: null,
  };

  it("should handle initial state", () => {
    expect(moviesReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setInitialState", () => {
    const movies = [{ id: 1, title: "Test Movie" }];
    const actual = moviesReducer(
      initialState,
      setInitialState({
        movies,
        totalPages: 1,
        currentPage: 1,
        totalResults: 1,
      })
    );
    expect(actual.movies).toEqual(movies);
  });

  it("should handle fetchMovies.pending", () => {
    const actual = moviesReducer(initialState, fetchMovies.pending);
    expect(actual.loading).toEqual(true);
  });

  it("should handle fetchMovies.fulfilled", () => {
    const movies = [{ id: 1, title: "Test Movie" }];
    const actual = moviesReducer(
      initialState,
      fetchMovies.fulfilled(
        { movies, totalPages: 1, currentPage: 1, totalResults: 1 },
        "",
        { query: "", page: 1 }
      )
    );
    expect(actual.movies).toEqual(movies);
    expect(actual.loading).toEqual(false);
  });
});
