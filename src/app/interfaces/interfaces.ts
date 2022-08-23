export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ResponseData {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails {
  backdrop_path: string;
  budget: number;
  genres: Array<MovieGenres>;
  homepage: string;
  overview: string;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  adult?: boolean;
  belongs_to_collection?: Array<Collection>;
  original_language?: string;
  id?: number;
  imdb_id?: number;
  original_title?: string;
  popularity?: number;
  production_companies?: Array<ProductionCompanies>;
  production_countries?: Array<ProductionCountries>;
  spoken_languages?: Array<SpokenLanguage>;
  video?: boolean;
  vote_count?: number;
}

interface Collection {
  id: number;
  name: string;
  poster_path: string;
}

interface MovieGenres {
  id: number;
  name: string;
}

interface ProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
}

interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface PaginationParams {
  pageNumber: number;
  moviesNumber: number;
}

export interface SearchParams {
  pageNumber: number;
  text: string;
}

export interface User {
  username: string;
  password: string;
}

export interface Genre {
  id: number;
  name: string;
  checked: boolean;
}
export interface SortingOption {
  value: string;
  title: string;
}
