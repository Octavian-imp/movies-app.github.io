export type MovieHttp = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieRatedHttp = MovieHttp & { rating: number }

export type MovieHttpResult = {
  page: number
  results: MovieHttp[]
  total_pages: number
  total_results: number
}

export type MovieRatedHttpResult = Omit<MovieHttpResult, "results"> & {
  results: MovieRatedHttp[]
} & { rating: number }

export type Movie = Pick<
  MovieHttp,
  | "original_title"
  | "overview"
  | "release_date"
  | "poster_path"
  | "id"
  | "vote_average"
  | "genre_ids"
>

export type MovieRated = Movie & { rating: number }
