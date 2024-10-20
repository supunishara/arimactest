"use client";

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchMovies, setInitialState } from "@/lib/features/moviesSlice";
import { RootState, AppDispatch } from "@/lib/store";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import { Spinner } from "@nextui-org/spinner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ThemeToggle } from "@/components/theme-toggle";
import { HomePageProps } from "@/types/movie";
import router from "next/router";
import { Button } from "./ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const ITEMS_PER_PAGE = 10;

export default function Home({ initialData }: HomePageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  // Calculate pagination related parameters
  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMovies = movies.slice(startIndex, endIndex);

  useEffect(() => {
    dispatch(setInitialState(initialData));
  }, [dispatch, initialData]);

  // Handle search
  useEffect(() => {
    dispatch(fetchMovies({ query: debouncedSearch, page: currentPage }));
  }, [debouncedSearch, currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <Spinner label="Loading..." color="success" />;
  }

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col justify-between items-center mb-8 gap-4 mt-10 relative">
        <h1 className="text-2xl font-bold dark:text-white">
          {search ? "Search Results" : "Popular Movies"}
        </h1>
        <ThemeToggle />
        <div className="flex items-center gap-4 w-full">
          {/* <SearchBar value={search} onChange={setSearch} /> */}

          <SearchBar value={search} onChange={handleSearch} />
          {/* <SearchInput value={searchTerm} onChange={handleSearch} /> */}
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-center">
          {"error"}: {error}
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div>
          <Button
            variant="outline"
            onClick={() => dispatch(setInitialState(initialData))}
            className="mb-5"
          >
            Back
          </Button>
          <div className="text-center dark:text-white">No movies found</div>
        </div>
      )}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 gap-y-6"
      >
        {currentMovies.map((movie) => (
          <motion.div
            key={movie.id}
            variants={itemVariants}
            className="flex justify-center items-start"
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {movies.length > 0 && (
        <div className="flex justify-center my-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={page === currentPage}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
