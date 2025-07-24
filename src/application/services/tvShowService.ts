import { inject, injectable } from "tsyringe";
import { ITVShowService } from "../../core/interfaces/ITVShowService";
import { ITmdbAPI } from "../../core/interfaces/ITmdbAPI";
import { TVShowDTO } from "../../dtos/TVShowDTO";
import { TvShow } from "../../core/entities/tvshow";
import { TVShowDetailsDTO } from "../../dtos/TvShowDetailsDTO";

const imageUrl = 'https://image.tmdb.org/t/p/w1920';

@injectable()
export class TvShowService implements ITVShowService{

    constructor(@inject("ITmdbAPI") private _tmdbAPI: ITmdbAPI) {}

    public async getTrendingTvShowsAsync(): Promise<TVShowDTO[]> {
        const tvShowData = await this._tmdbAPI.getTrendingTvShowsAsync();
        if(!tvShowData)
            return [];

        const tvShows:TVShowDTO[] = tvShowData.map((tvShow:TvShow) => {
            
            return{ 
                id: tvShow.id,
                title: tvShow.name,
                posterPath: imageUrl + tvShow.poster_path,
                overview: tvShow.overview,
                releaseDate: tvShow.first_air_date,
                genres: tvShow.genres,
                type: "tv"
            };
        }).slice(0,10);
    
        return tvShows;
    }

    public async getSpecificTvShowData(id: number): Promise<TVShowDetailsDTO | undefined> {
        const type = "details";
        let tvShowData = await this._tmdbAPI.getDetailsTvShowsAsync(id, type);
        if(!tvShowData)
            return;

        const tvShow = new TVShowDetailsDTO(tvShowData)

        return tvShow
    }
}