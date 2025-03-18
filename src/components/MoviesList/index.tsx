import { Alert, Spin } from "antd"
import React, { useEffect, useState } from "react"
import getMovies from "../../services/getMovies"
import { Movie } from "../../types/movie"
import MovieCard from "../movieCard"

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
}

const contentSpin = <div style={contentStyle} />

const MoviesList = () => {
  const [movies, setMovies] = useState<Array<Movie> | Error>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getMovies().then((movies) => {
      setMovies(movies)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <Spin
        style={{ margin: "auto", alignSelf: "center" }}
        size="large"
        tip="Loading..."
      >
        {contentSpin}
      </Spin>
    )
  }

  if (movies instanceof Error) {
    return (
      <Alert
        type="error"
        message="При выполнении запроса произошла ошибка"
        style={{ height: "fit-content", alignSelf: "center" }}
      />
    )
  }

  return (
    <>
      {movies.map(
        ({
          original_title: title,
          overview: description,
          release_date: releaseDate,
          genres = ["default"],
          poster_path,
        }) => (
          <MovieCard
            key={title}
            description={description}
            genres={genres}
            releaseDate={releaseDate}
            title={title}
            posterURL={poster_path}
          />
        )
      )}
    </>
  )
}

export default MoviesList
