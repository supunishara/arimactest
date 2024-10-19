interface Genre {
  id: number;
  name: string;
}

interface ProdCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface MovieDetails {
  title: boolean;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  status: string;
  revenue: number;
  original_language: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  homepage: string;
  id: number;
  imdb_id: string;
  popularity: number;
  genres: Genre[];
  production_companies: ProdCompanies;
}
