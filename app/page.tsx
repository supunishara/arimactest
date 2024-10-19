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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ITEMS_PER_PAGE = 10;

export default function Home() {
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

  // Fetch popular movies on initial load
  useEffect(() => {
    dispatch(fetchMovies(""));
  }, [dispatch]);

  // Fetch search results when search term changes
  useEffect(() => {
    dispatch(fetchMovies(debouncedSearch));
    setCurrentPage(1); // Reset to first page when search changes
  }, [debouncedSearch, dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          <ThemeToggle />
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
          {currentMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

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
      </motion.div>
    </div>
  );
}
