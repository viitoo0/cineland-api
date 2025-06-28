import axios, { Axios } from 'axios';
import { ITmdbAPI } from '../core/interfaces/ITmdbAPI';
import { Movie } from '../core/entities/movie';
import { injectable } from 'tsyringe';
import { TvShow } from '../core/entities/tvshow';
const apiKey = process.env.TMDB_APIKEY;

@injectable()
export class TmdbAPI implements ITmdbAPI{
    private _httpClient!: Axios;
    private _trendingMoviePath: string = '3/trending/movie/week?language=pt-BR';
    private _trendingTvShowPath: string = '3/trending/tv/week?language=pt-BR';
    private _movieDetails: string = '3/movie/';
    private _tvShowDetails: string = '3/tv/';

    constructor() {
        this.createAxiosInstance(); 
    }
    
    private createAxiosInstance(): void {
        this._httpClient = axios.create({
            baseURL: 'https://api.themoviedb.org/',
            headers: {
                Authorization: 'Bearer '+ apiKey,
                'Content-Type': 'application/json'
            }
        });
    }

    public async getTrendingMoviesAsync(): Promise<Movie[]> {
        const trendingData = await this._httpClient.get(this._trendingMoviePath);
        let detailMovieData = [];

        if(trendingData.status !== 200)
            return [];

        
        for(let result of trendingData.data.results){
            const type = "";
            let detail = await this.getDetailsMovieAsync(result.id, type);
            detail == undefined ? '' : detailMovieData.push(detail);
        }
        return detailMovieData;
        
    }
    public async getTrendingTvShowsAsync(): Promise<TvShow[]> {
        const trendingData = await this._httpClient.get(this._trendingTvShowPath);
        let detailTvShowData = [];
        
        if(trendingData.status !== 200)
            return [];
        
        for(let result of trendingData.data.results){
            const type = "";
            let detail = await this.getDetailsTvShowsAsync(result.id, type);
            detail == undefined ? '' : detailTvShowData.push(detail);
        }
        return detailTvShowData;
    } 
    
    public async getDetailsMovieAsync(id:number, type:string): Promise<Movie | undefined> {
        
        const detailMovieData = await this._httpClient.get(this._movieDetails + id+ (type == "details" ? "?append_to_response=videos,release_dates,credits&language=pt-BR&include_video_language=en-US,pt-BR" : "?language=pt-BR"));

        if(detailMovieData.status !== 200)
            return ;

        return detailMovieData.data;
    }
    public async getDetailsTvShowsAsync(id:number, type:string): Promise<TvShow | undefined>{
        const detailTvShowData = await this._httpClient.get(this._tvShowDetails + id + (type == "details" ? "?append_to_response=videos,content_ratings,aggregate_credits&language=pt-BR&include_video_language=en-US,pt-BR" : "?language=pt-BR"));
        
        if(detailTvShowData.status !== 200)
            return ;

        return detailTvShowData.data;
    }
}