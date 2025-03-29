import { Alert, Spin } from "antd"
import React, { useContext, useEffect, useState } from "react"
import MovieApi from "../../services/MovieApi"
import MovieContext from "../../store/MovieProvider"
import { MovieHttpResult } from "../../types/movie"
import MoviesList from "../ui/MoviesList"
import SearchField from "../ui/SearchField"

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
}

const contentSpin = <div style={contentStyle} />

const SearchMovies = () => {
  const [movies, setMovies] = useState<MovieHttpResult | Error>(Error)
  const [isLoading, setIsLoading] = useState(true)
  const { query, setCurrentPage, setTotalResults, currentPage, totalResults } =
    useContext(MovieContext)

  useEffect(() => {
    if (query === null) {
      return
    }
    MovieApi.getMovies(query, currentPage).then((movies) => {
      if (!movies.hasOwnProperty("status_code")) {
        const res = movies as MovieHttpResult
        setMovies(res)
        setCurrentPage(res.page)
        setTotalResults(res.total_results)
      }
      setIsLoading(false)
    })
  }, [query, currentPage, totalResults])

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <SearchField />
        <Spin style={{ margin: "auto" }} size="large" tip="Loading...">
          {contentSpin}
        </Spin>
      </div>
    )
  }

  if (movies instanceof Error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <SearchField />
        <Alert
          type="error"
          message="При выполнении запроса произошла ошибка"
          style={{ height: "fit-content", margin: "0 auto" }}
        />
      </div>
    )
  }

  if (movies?.results.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <SearchField />
        <Alert
          type="info"
          message="Ничего не нашлось"
          style={{ height: "fit-content", margin: "0 auto" }}
        />
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <SearchField />
      <MoviesList
        currentPage={currentPage}
        totalResults={totalResults}
        movies={movies.results}
      />
    </div>
  )
}

export default SearchMovies
