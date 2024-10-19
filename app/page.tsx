"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchMovies } from "@/lib/features/moviesSlice";
import { RootState, AppDispatch } from "@/lib/store";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import { Spinner } from "@nextui-org/spinner";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  // Fetch popular movies on initial load
  useEffect(() => {
    dispatch(fetchMovies(""));
  }, [dispatch]);

  // Fetch search results when search term changes
  useEffect(() => {
    dispatch(fetchMovies(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  if (loading) {
    return <Spinner label="Loading..." color="success" />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <div className="flex flex-col justify-between items-center mb-8 gap-4 mt-10 relative">
          <h1 className="text-2xl font-bold dark:text-white">
            {search ? "Search Results" : "Popular Movies"}
          </h1>
          <div className="flex items-center gap-4 w-full">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-center">
            {"error"}: {error}
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="text-center dark:text-white">No movies found</div>
        )}

        <div>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
