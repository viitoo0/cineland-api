import { inject, injectable } from "tsyringe";
import { Movie } from "../../core/entities/movie";
import { IMovieService } from "../../core/interfaces/IMovieService";
import { ITmdbAPI } from "../../core/interfaces/ITmdbAPI";
import { MovieDTO } from "../../dtos/MovieDTO";
import { MovieDetailsDTO } from "../../dtos/MovieDetailsDTO"

const imageUrl = 'https://image.tmdb.org/t/p/w1920';

@injectable()
export class MovieService implements IMovieService{

    constructor(@inject("ITmdbAPI") private _tmdbAPI: ITmdbAPI) {}

    public async getTrendingMoviesAsync(): Promise<MovieDTO[]> {
        const movieData = await this._tmdbAPI.getTrendingMoviesAsync();
        if(!movieData)
            return [];

        const movies:MovieDTO[] = movieData.map((movie:Movie) => {
            return {
                id: movie.id,
                title: movie.title,
                posterPath: imageUrl + movie.poster_path,
                overview: movie.overview,
                releaseDate: movie.release_date,
                genres: movie.genres,
                runtime: movie.runtime,
                type: "movie"
            };
        }).slice(0,10);
        return movies;
    }

    public async getSpecificMovieData(id:number): Promise<MovieDetailsDTO | undefined>{
        const type = "details";
        let hasBR: boolean;
        let movieData = await this._tmdbAPI.getDetailsMovieAsync(id, type);
        if(!movieData)
            return;

        movieData.release_dates = movieData.release_dates.results.filter((result: { iso_3166_1: string; }) => {return result.iso_3166_1 == "BR"})
        
        movieData.videos.results = movieData.videos.results.filter((result: { type: string; }) => {return result.type == "Trailer"})
        movieData.videos.results.forEach((result: { iso_3166_1: string; }) => {
            if(result.iso_3166_1 == "BR"){
                hasBR = true;
            }
        })
        movieData.videos = movieData.videos.results.filter((result: {iso_3166_1: string;}) => {return hasBR == true ? result.iso_3166_1 == "BR" : result.iso_3166_1 == "US"});
        // console.log(movieData)
        const movie:MovieDetailsDTO = {
            id: movieData.id,
            backdropPath: imageUrl + movieData.backdrop_path,
            posterPath: imageUrl + movieData.poster_path,
            genres: movieData.genres,
            title: movieData.title,
            overview: movieData.overview,
            productionCountry: movieData.production_countries,
            releaseDate: movieData.release_date,
            runtime: movieData.runtime,
            status: movieData.status,
            videos: movieData.videos[0],
            certifications: movieData.release_dates,
            credits: movieData.credits
        }
        return movie;
    }
}
