export interface MovieDetailsDTO {
    id: number;
    backdropPath: string;
    posterPath: string;
    genres: string[];
    title: string;
    overview: string;
    productionCountry: string[];
    releaseDate: string;
    runtime: number;
    status: string;
    videos: any;
    certifications: any;
    credits: any
}