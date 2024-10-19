import Link from "next/link";
import { Movie } from "../types/movie";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <motion.div whileHover={{ scale: 1.05 }} className="h-full">
        <Card className="w-[300px]">
          <div className="relative h-[300px] w-[300px]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
          <CardContent className="p-4">
            <CardTitle className="line-clamp-1">{movie.title}</CardTitle>
            <CardDescription className="mt-2 line-clamp-2">
              {movie.overview}
            </CardDescription>
            <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
