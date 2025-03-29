import { ConfigProvider, Layout, Tabs, TabsProps } from "antd"

import React, { useEffect, useState } from "react"
import RatedMovies from "./components/RatedMovies"
import SearchMovies from "./components/SearchMovies"
import MovieApi from "./services/MovieApi"
import MovieContext, { GenreItem } from "./store/MovieProvider"
import { MovieRatedHttpResult } from "./types/movie"

const { Content } = Layout

const tabsItems: TabsProps["items"] = [
  {
    key: "1",
    label: "Search",
    children: <SearchMovies />,
  },
  {
    key: "2",
    label: "Rated",
    children: <RatedMovies />,
    destroyInactiveTabPane: true,
  },
]

const App = () => {
  const [query, setQuery] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined)
  const [totalResults, setTotalResults] = useState<number | undefined>(
    undefined
  )
  const [genres, setGenres] = useState<Array<GenreItem>>([])
  const [movieRatedIds, setMovieRatedIds] = useState<
    Array<{ id: number; rating: number }> 
  >([])

  useEffect(() => {
    MovieApi.getGuestSession()
    MovieApi.getGenres().then((result) => {
      if (!result.hasOwnProperty("status_code")) {
        const res = result as { genres: Array<GenreItem> }
        setGenres(res.genres)
      }
    })
    MovieApi.getRatedMovies()
      .then((result) => {
        if (!result.hasOwnProperty("status_code")) {
          const res = result as MovieRatedHttpResult
          setMovieRatedIds(
            res.results.map((movie) => ({
              id: movie.id,
              rating: movie.rating,
            }))
          )
        }
      })
      .catch(() => {
        setMovieRatedIds([])
      })
  }, [])

  return (
    <MovieContext.Provider
      value={{
        query: query,
        setQuery: setQuery,
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
        totalResults: totalResults,
        setTotalResults: setTotalResults,
        genres: genres,
        movieRatedIds: movieRatedIds,
        setMovieRatedIds: setMovieRatedIds,
      }}
    >
      <ConfigProvider
        theme={{
          hashed: false,
          components: {
            Rate: {
              starSize: 16,
              marginXS: 5,
            },
          },
        }}
      >
        <Layout
          style={{
            minHeight: "100vh",
            backgroundColor: "#fff",
            margin: "0 auto",
            padding: "31px 20px",
            maxWidth: "1010px",
            width: "100%",
          }}
        >
          <Content className="text-center">
            <Tabs
              defaultActiveKey="1"
              items={tabsItems}
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
              tabBarStyle={{ margin: "0 auto 20px", width: "fit-content" }}
              centered
            />
          </Content>
        </Layout>
      </ConfigProvider>
    </MovieContext.Provider>
  )
}

export default App
