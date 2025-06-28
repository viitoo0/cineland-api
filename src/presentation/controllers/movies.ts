import { Request, Response, Router } from "express";
import { IMovieService } from "../../core/interfaces/IMovieService";
import { IControllerBase } from "../../core/interfaces/IControllerBase";
import { autoInjectable, inject } from "tsyringe";

@autoInjectable()
export class MovieController implements IControllerBase{
    constructor(@inject("IMovieService") private _movieService: IMovieService){}
    
    public registerRoutes(): Router {
        const router = Router();
        router.get("/trending/movie/week", (req, res) => this.getTrendingMovies(req, res));
        router.get("/movie/:id", (req, res) => this.getSpecificMovieData(req,res));
        return router;    
    }
    
    private async getSpecificMovieData(req: Request, res: Response){
        const id = Number(req.params.id);
        if(Number.isNaN(id))
            return ;

        try{
            const movie = await this._movieService.getSpecificMovieData(id)
            res.send(movie)
        } catch {
            res.status(500).send('Internal Server Error')
        }
    }

    private async getTrendingMovies(req: Request, res: Response) {
        try{
            const movies = await this._movieService.getTrendingMoviesAsync();
            res.send(movies);
        } catch {
            res.status(500).send('Internal Server Error');
        }
    }

}