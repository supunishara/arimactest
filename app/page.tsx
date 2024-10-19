"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchMovies } from "@/lib/features/moviesSlice";
import { RootState, AppDispatch } from "@/lib/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  // Fetch popular movies on initial load
  useEffect(() => {
    dispatch(fetchMovies(""));
  }, [dispatch]);

  console.log("movies-------", movies);

  return <main className="min-h-screen p-8 bg-white dark:bg-gray-900"></main>;
}
