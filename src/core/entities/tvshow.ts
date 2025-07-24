export interface TvShow {
    id: number,
    name: string,
    backdrop_path: string,
    poster_path: string,
    overview: string,
    first_air_date: string,
    genres: string[],
    created_by: string[],
    status: string,
    seasons: string[],
    production_countries: string[],
    videos: any,
    content_ratings: any,
    aggregate_credits: any
}