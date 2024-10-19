import { Suspense } from "react";
import { fetchMoviesAPI } from "@/lib/api";
import HomePage from "@/components/HomePage";
import { Movie } from "@/types/movie";

export const revalidate = 3600; // Revalidate every hour

async function getMovies() {
  try {
    const data = await fetchMoviesAPI("");
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return {
      movies: [] as Movie[],
      totalPages: 0,
      currentPage: 1,
      totalResults: 0,
    };
  }
}

export default async function Page() {
  const initialData = await getMovies();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage initialData={initialData} />
    </Suspense>
  );
}
