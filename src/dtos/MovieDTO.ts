export interface MovieDTO {
    id: number;
    title: string;
    posterPath: string;
    overview: string;
    releaseDate: string;
    genres: string[];
    runtime: number;
    type: string;
}