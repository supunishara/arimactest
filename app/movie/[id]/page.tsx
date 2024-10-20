"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Movie } from "@/types/movie";
import { motion } from "framer-motion";
import { fetchMovieDetails } from "@/lib/features/movieDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Spinner } from "@nextui-org/spinner";
const DefaultImage = "/assets/images/default.png";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const contentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.2 },
  },
};

export default function MovieDetail() {
  const params = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = params;

  const { movieDetail, loading, error } = useSelector(
    (state: RootState) => state.movieDetail
  );

  useEffect(() => {
    dispatch(fetchMovieDetails(+id));
  }, [id]);

  if (loading) {
    return <Spinner label="Loading..." color="success" />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen p-8"
    >
      <Button variant="outline" onClick={() => router.back()} className="mb-5">
        Back
      </Button>

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
          src={
            movieDetail?.poster_path
              ? `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`
              : DefaultImage
          }
          alt={movieDetail?.overview}
          className="rounded-lg shadow-lg"
          width={400}
          height={600}
        />

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl font-bold mb-4">{movieDetail?.title}</h1>
          <p className="text-gray-600 mb-4">{movieDetail?.overview}</p>
          <div className="flex items-center gap-4">
            <span>Release Date: {movieDetail?.release_date}</span>
            <span>Rating: {movieDetail?.vote_average}/10</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
