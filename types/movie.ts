export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

export interface HomePageProps {
  initialData: {
    movies: Movie[];
    totalPages: number;
    currentPage: number;
    totalResults: number;
  };
}

export interface MoviesState {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
  totalResults: number;
  loading: boolean;
  error: string | null;
}
