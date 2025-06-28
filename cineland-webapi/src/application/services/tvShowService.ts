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
        let hasBR: boolean;
        let tvShowData = await this._tmdbAPI.getDetailsTvShowsAsync(id, type);
        if(!tvShowData)
            return;


        tvShowData.content_ratings = tvShowData.content_ratings.results.filter((result: { iso_3166_1: string; }) => {return result.iso_3166_1 == "BR"})

        tvShowData.videos.results = tvShowData.videos.results.filter((result: { type: string; }) => result.type == "Trailer")
        tvShowData.videos.results.forEach((result: { iso_3166_1: string; }) => {
            if(result.iso_3166_1 == "BR"){
                hasBR = true;
            }
        })
        tvShowData.videos = tvShowData.videos.results.filter((result: {iso_3166_1: string;}) => {return hasBR == true ? result.iso_3166_1 == "BR" : result.iso_3166_1 == "US"});
        // console.log(tvShowData)
        const tvShow:TVShowDetailsDTO = {
            id: tvShowData.id,
            title: tvShowData.name,
            backdropPath: imageUrl + tvShowData.backdrop_path,
            posterPath: imageUrl + tvShowData.poster_path,
            overview: tvShowData.overview,
            releaseDate: tvShowData.first_air_date,
            genres: tvShowData.genres,
            createdBy: tvShowData.created_by,
            status: tvShowData.status,
            seasons: tvShowData.seasons,
            productionCountry: tvShowData.production_countries,
            spokenLanguages: tvShowData.spoken_languages,
            videos: tvShowData.videos[0],
            certifications: tvShowData.content_ratings,
            credits: tvShowData.aggregate_credits
        }
        console.log(tvShow)
        return tvShow
    }
}