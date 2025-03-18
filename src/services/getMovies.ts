import { MovieHttp } from "../types/movie"

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
}

const getMovies: () => Promise<Array<MovieHttp> | Error> = () =>
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=witcher&include_adult=false&language=ru-RU&page=1&api_key=${process.env.API_KEY}`,
    options
  )
    .then((res) => res.json())
    .then((res) => res.results)
    .catch((err) => err)

export default getMovies
