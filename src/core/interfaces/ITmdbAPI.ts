import { Movie } from "../entities/movie";
import { TvShow } from "../entities/tvshow";

export interface ITmdbAPI{
    getTrendingMoviesAsync(): Promise<Movie[]>;
    getTrendingTvShowsAsync(): Promise<TvShow[]>;
    getDetailsMovieAsync(id:number, type:string): Promise<Movie | undefined>
    getDetailsTvShowsAsync(id:number, type:string): Promise<TvShow | undefined>
}