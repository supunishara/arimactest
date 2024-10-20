import Link from "next/link";
import { Movie } from "../types/movie";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
const DefaultImage = "/assets/images/default.png";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  return (
    <Link href={`/movie/${movie.id}`} className="w-full max-w-sm mx-auto">
      <div
        key={movie.id}
        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-md"
      >
        <motion.div whileHover={{ scale: 1.05 }} className="h-full">
          <div className="border border-gray-200 dark:border-gray-700 ">
            <div className="relative h-[300px] w-full">
              <Image
                src={
                  movie?.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                    : DefaultImage
                }
                alt={movie?.title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardContent className="p-4">
              <CardTitle className="line-clamp-1 text-xl mb-2">
                {movie.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 mb-4">
                {movie?.overview}
              </CardDescription>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>
                  {movie?.release_date
                    ? new Date(movie?.release_date).getFullYear()
                    : "Date Not Available"}
                </span>
                <span className="flex items-center gap-1">
                  ⭐ {movie?.vote_average?.toFixed(1)}
                </span>
              </div>
            </CardContent>
          </div>
        </motion.div>
      </div>
    </Link>
  );
}
