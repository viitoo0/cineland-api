export interface Movie {
    id: number,
    title: string,
    poster_path: string,
    backdrop_path: string,
    overview: string,
    release_date: string,
    genres: string[],
    runtime: number,
    type: string,
    production_countries: string[],
    status: string,
    videos: any,
    release_dates: any,
    credits: any
}