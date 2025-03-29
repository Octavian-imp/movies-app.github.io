import { GenreItem } from "../store/MovieProvider"
import { MovieHttpResult, MovieRatedHttpResult } from "../types/movie"


export type MovieApiError = { status_code: number; status_message: string, success:boolean }

export default class MovieApi {
  private static baseUrl = "https://api.themoviedb.org/3"
  private static apiKey = "c8017a429e7392ce4c187b672916a252"
  private static bearerToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODAxN2E0MjllNzM5MmNlNGMxODdiNjcyOTE2YTI1MiIsIm5iZiI6MTczNjM4MzY4Ny42NjYsInN1YiI6IjY3N2YxY2M3NjFhODczOTUyYzdiMWUyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k0alA8Sw6qv17s4O6dVpvEDCTdafNjw58WeevKz5b9w"
  private static sessionId: null | string = null

  static imgUrl = "https://image.tmdb.org/t/p/w500"

  static async getGuestSession(): Promise<string |undefined | MovieApiError> {
    console.log(
      Date.parse(localStorage.getItem("expires_at") as string),
      Date.now(),
      Date.parse(localStorage.getItem("expires_at") as string) > Date.now(),
      localStorage.getItem("expires_at") !== null
    )

    if (
      localStorage.getItem("expires_at") &&
      Date.parse(localStorage.getItem("expires_at") as string) > Date.now()
    ) {
      console.log("сессия валидна")
      this.sessionId = localStorage.getItem("guest_session_id")
      return
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.bearerToken}`,
      },
    }

    const result = await fetch(
      `${this.baseUrl}/authentication/guest_session/new?api_key=${this.apiKey}`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("guest_session_id", res.guest_session_id)
        localStorage.setItem("expires_at", res.expires_at)
        this.sessionId = res.guest_session_id
        return res.guest_session_id
      })
      .catch((err) => err)
    return result
  }

  static async getMovies(
    query: string,
    page: number = 1
  ): Promise<MovieHttpResult | MovieApiError> {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.bearerToken}`,
      },
    }

    return await fetch(
      `${this.baseUrl}/search/movie?query=${query}&include_adult=false&language=ru-RU&page=${page}&api_key=${this.apiKey}`,
      options
    )
      .then((res) => res.json())
      .catch((err) => err)
  }

  static async getGenres(): Promise<{ genres: Array<GenreItem> } | MovieApiError> {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.bearerToken}`,
      },
    }

    return await fetch(`${this.baseUrl}/genre/movie/list?language=en`, options)
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err)
  }

  static async getRatedMovies(
    page: number = 1
  ): Promise<MovieRatedHttpResult | MovieApiError> {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.bearerToken}`,
      },
    }

    return await fetch(
      `${this.baseUrl}/guest_session/${this.sessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.desc`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success === false) throw new Error(res.status_message)
        else return res
      })
  }

  static async addRating(movieId: number, rating: number) {
    const body = {
      value: rating,
    }

    const options: RequestInit = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${this.bearerToken}`,
      },
      body: JSON.stringify(body),
    }

    fetch(
      `${this.baseUrl}/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${this.sessionId}`,
      options
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }
}
