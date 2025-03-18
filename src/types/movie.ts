
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

export type Movie = Pick<MovieHttp, 'original_title' | 'overview' | 'release_date' | 'poster_path'>& Partial<{genres: string[]}>