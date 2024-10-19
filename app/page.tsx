"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchMovies } from "@/lib/features/moviesSlice";
import { RootState, AppDispatch } from "@/lib/store";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  // Fetch popular movies on initial load
  useEffect(() => {
    dispatch(fetchMovies(""));
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold dark:text-white">
          {search ? "Search Results" : "Popular Movies"}
        </h1>
      </div>

      {!loading && !error && movies.length === 0 && (
        <div className="text-center dark:text-white">No movies found</div>
      )}

      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
