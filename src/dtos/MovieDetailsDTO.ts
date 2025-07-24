import { TVMovieBaseDetails } from "./TvShowDetailsDTO";

export class MovieDetailsDTO extends TVMovieBaseDetails{

    title: string; 
    releaseDate: Date;
    credits: any;
    directors: string[];
    writers: string[];
    certifications: any;
    runtime: number;

    constructor(movie: any){
        super(movie)

        this.title = movie.title;
        this.releaseDate = movie.release_date;
        this.credits = this.mapCredits(movie.credits.cast);
        this.directors = movie.credits.crew.filter((result: { job:string }) => {return result.job == "Director"});
        this.writers = movie.credits.crew.filter((result: { job:string }) => {return result.job == "Writer"});
        this.certifications = this.filterBRCertification(movie.release_dates)
        this.runtime = movie.runtime;
    }

    private filterBRCertification(release_dates: any){
        let BRCertifications = release_dates.results.filter((result: { iso_3166_1: string }) => {return result.iso_3166_1 == "BR"});
        return BRCertifications[0].release_dates.filter((result: {certification: string}) => {return result.certification != ""})
    }

    private mapCredits(cast: any){
        return cast.map((x: {profile_path: string}) => ({...x, profile_path:`https://image.tmdb.org/t/p/w1920${x.profile_path}`}));
    }
    
}