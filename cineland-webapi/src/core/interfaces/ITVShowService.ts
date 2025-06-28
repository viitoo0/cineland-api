import { TVShowDetailsDTO } from "../../dtos/TvShowDetailsDTO";
import { TVShowDTO } from "../../dtos/TVShowDTO";

export interface ITVShowService{
    getTrendingTvShowsAsync(): Promise<TVShowDTO[]>;
    getSpecificTvShowData(id:number): Promise<TVShowDetailsDTO | undefined>;
}