import { Alert, Spin } from "antd"
import { isNull } from "lodash"
import React, { useEffect, useState } from "react"
import MovieApi from "../../services/MovieApi"
import { MovieHttpResult, MovieRatedHttpResult } from "../../types/movie"
import MoviesList from "../ui/MoviesList"

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
}

const contentSpin = <div style={contentStyle} />
const RatedMovies = () => {
  const [ratedMovies, setRatedMovies] = useState<
    MovieHttpResult | Error | null
  >(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    MovieApi.getRatedMovies()
      .then((result) => {
        if (!result.hasOwnProperty("status_code")) {
          const res = result as MovieRatedHttpResult
          setRatedMovies(res )
          setIsLoading(false)
        }
      })
      .catch(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <Spin style={{ margin: "auto" }} size="large" tip="Loading...">
        {contentSpin}
      </Spin>
    )
  }

  if (ratedMovies instanceof Error) {
    return (
      <Alert
        type="error"
        message="При выполнении запроса произошла ошибка"
        style={{ height: "fit-content", margin: "0 auto" }}
      />
    )
  }

  if (ratedMovies?.results.length === 0) {
    return (
      <Alert
        type="info"
        message="Ничего не нашлось"
        style={{ height: "fit-content", margin: "0 auto" }}
      />
    )
  }
  if (isNull(ratedMovies))
    return <div>У вас пока нет фильмов которые вы оценили </div>
  return (
    <MoviesList
      currentPage={ratedMovies.page}
      movies={ratedMovies.results}
      totalResults={ratedMovies.total_results}
    />
  )
}

export default RatedMovies
