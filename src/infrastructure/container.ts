import { container } from "tsyringe";
import { IMovieService } from "../core/interfaces/IMovieService";
import { MovieService } from "../application/services/movieService";
import { TmdbAPI } from "../APIs/tmdbAPI";
import { ITmdbAPI } from "../core/interfaces/ITmdbAPI";
import { ITVShowService } from "../core/interfaces/ITVShowService";
import { TvShowService } from "../application/services/tvShowService";

container.register<IMovieService>('IMovieService', { useClass: MovieService});
container.register<ITVShowService>('ITVShowService', { useClass: TvShowService});
container.register<ITmdbAPI>('ITmdbAPI', { useClass: TmdbAPI});