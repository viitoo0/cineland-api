export interface TVShowDetailsDTO {
    id: number;
    title: string;
    backdropPath: string;
    posterPath: string;
    overview: string;
    releaseDate: string;
    genres: string[];
    createdBy: string[];
    status: string;
    seasons: string[];
    productionCountry: string[];
    spokenLanguages: string[];
    videos: any;
    certifications: any;
    credits: any;
}