import { createContext, Dispatch, SetStateAction } from "react"

export type GenreItem = {
  id: number
  name: string
}

type MovieContextType = {
  query: string | null
  setQuery: Dispatch<SetStateAction<string | null>>
  currentPage: number | undefined
  setCurrentPage: Dispatch<SetStateAction<number | undefined>>
  totalResults: number | undefined
  setTotalResults: Dispatch<SetStateAction<number | undefined>>
  genres: Array<GenreItem>
  movieRatedIds: Array<{id: number, rating:number}>
  setMovieRatedIds: Dispatch<SetStateAction<Array<{id: number, rating:number}>>>
}

export const MovieContextDefaultValue: MovieContextType = {
  query: null,
  setQuery: () => {},
  currentPage: undefined,
  setCurrentPage: () => {},
  totalResults: undefined,
  setTotalResults: () => {},
  genres: [],
  movieRatedIds: [],
  setMovieRatedIds: () => {},
}

const MovieContext = createContext<MovieContextType>(MovieContextDefaultValue)

export default MovieContext
