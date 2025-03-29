import { Flex } from "antd"
import React from "react"
import { Movie, MovieRated } from "../../../types/movie"
import MovieCard from "../MovieCard"
import UiPagination from "../Pagination"

const MoviesList = ({
  movies,
  currentPage,
  totalResults,
}: {
  movies: Array<Exclude<Movie, "rating"> & Partial<Pick<MovieRated, "rating">>>
  currentPage: number | undefined
  totalResults: number | undefined
}) => {
  return (
    <>
      <Flex style={{ gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        {movies.map(
          ({
            original_title: title,
            overview: description,
            release_date: releaseDate,
            genre_ids,
            poster_path,
            id,
            vote_average,
          }) => (
            <MovieCard
              key={id}
              id={id}
              genreIds={genre_ids}
              title={title}
              description={description}
              releaseDate={releaseDate}
              posterURL={poster_path}
              ratingAverage={vote_average}
            />
          )
        )}
      </Flex>
      <UiPagination currentPage={currentPage} total={totalResults} />
    </>
  )
}

export default MoviesList
