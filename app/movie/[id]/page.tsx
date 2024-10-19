"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Movie, MovieDetails } from "@/types/movie";
import { motion } from "framer-motion";
import { fetchMovieDetails } from "@/lib/features/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MovieDetail() {
  const params = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = params;

  const { movieDetail, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  console.log("movieDetail--221--movieDetail", movieDetail);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8"
    >
      <Button variant="outline" onClick={() => router.back()} className="mb-5">
        Back
      </Button>

      {loading && (
        <div className="flex justify-center items-center h-32 dark:text-white">
          {"loading"}
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center">
          {"error"}: {error}
        </div>
      )}

      {!loading && !error && Object.keys(movieDetail).length === 0 && (
        <div className="text-center dark:text-white">No movie Detail found</div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`}
          alt={movieDetail?.title}
          className="rounded-lg shadow-lg"
          width={400}
          height={600}
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">{movieDetail?.title}</h1>
          <p className="text-gray-600 mb-4">{movieDetail?.overview}</p>
          <div className="flex items-center gap-4">
            <span>Release Date: {movieDetail?.release_date}</span>
            <span>Rating: {movieDetail?.vote_average}/10</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
