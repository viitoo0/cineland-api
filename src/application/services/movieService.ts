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
        let movieData = await this._tmdbAPI.getDetailsMovieAsync(id, type);
        if(!movieData)
            return;
        
        const movie = new MovieDetailsDTO(movieData)
        return movie;
    }
}
