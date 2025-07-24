export class TVMovieBaseDetails{
    private readonly youtubeUrl:string = "https://www.youtube.com/watch?v=";
    private readonly imageUrl:string = "https://image.tmdb.org/t/p/w1920";

    public id: number;
    public backdropPath: string;
    public posterPath: string;
    public overview: string;
    public genres: string[];
    public productionCountry: string[];
    public video: string;
    
    constructor(mediaData: any){
        this.id = mediaData.id;
        this.backdropPath = this.imageUrl + mediaData.backdrop_path;
        this.posterPath = this.imageUrl + mediaData.poster_path;
        this.overview = mediaData.overview;
        this.genres = mediaData.genres;
        this.productionCountry = mediaData.production_countries;
        this.video = this.filterTrailer(mediaData.videos);
    }
    
    
    private filterTrailer(videos: any) {
        let hasBR = videos.results.some((x:any) => x.iso_3166_1 == "BR" && x.type == "Trailer");
        let trailers = videos.results.sort((x: {published_at: Date}, y: {published_at: Date}) => new Date (x.published_at).getTime()-new Date(y.published_at).getTime()).filter((result: { type: string; iso_3166_1: string; }) => result.type == "Trailer" && (hasBR ? result.iso_3166_1 == "BR" : result.iso_3166_1 == "US" || result.iso_3166_1 == "CN"))
        return this.youtubeUrl + trailers[0].key;
    }
}

export class TVShowDetailsDTO extends TVMovieBaseDetails{
    title: string;
    credits: any;
    certifications: any;
    createdBy: string[];
    status: string;
    seasons: string[];
    releaseDate: Date;
    
    constructor(tvShow: any){
        super(tvShow)
        
        this.title = tvShow.name;
        this.credits = this.mapCredits(tvShow.aggregate_credits.cast);
        this.certifications = this.filterBRCertification(tvShow.content_ratings);
        this.createdBy = tvShow.created_by;
        this.status = tvShow.status;
        this.seasons = this.mapSeasons(tvShow.seasons);
        this.releaseDate = tvShow.first_air_date;
    }
    
    private filterBRCertification(content_ratings: any) {
        return content_ratings.results.filter((result: { iso_3166_1: string; }) => {return result.iso_3166_1 == "BR"});
    }

    private mapSeasons(seasons:any){
        return seasons.map((x: {poster_path: string}) => ({...x, poster_path:`https://image.tmdb.org/t/p/w1920${x.poster_path}`}));
    }

    private mapCredits(cast: any){
        return cast.map((x: {profile_path: string}) => ({...x, profile_path:`https://image.tmdb.org/t/p/w1920${x.profile_path}`}));
    }
}