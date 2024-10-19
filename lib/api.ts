import { Movie } from "@/types/movie"; // Create this type file if not exists

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMoviesAPI(query: string = "", page: number = 1) {
  const endpoint = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.status_message || "Failed to fetch movies");
    }

    return {
      movies: data.results,
      totalPages: data.total_pages,
      currentPage: data.page,
      totalResults: data.total_results,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}
