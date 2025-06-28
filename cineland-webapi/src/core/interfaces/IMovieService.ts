import { MovieDetailsDTO } from "../../dtos/MovieDetailsDTO";
import { MovieDTO } from "../../dtos/MovieDTO";

export interface IMovieService{
    getTrendingMoviesAsync(): Promise<MovieDTO[]>;
    getSpecificMovieData(id:number): Promise<MovieDetailsDTO | undefined>;
}