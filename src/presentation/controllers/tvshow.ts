import { autoInjectable, inject } from "tsyringe";
import { IControllerBase } from "../../core/interfaces/IControllerBase";
import { ITVShowService } from "../../core/interfaces/ITVShowService";
import { Router, Request, Response } from "express";

@autoInjectable()
export class TvShowController implements IControllerBase{
    constructor(@inject("ITVShowService") private _tvShowService: ITVShowService){}

    public registerRoutes(): Router {
        const router = Router();
        router.get("/trending/tv/week", (req, res) => this.getTrendingTvShows(req, res));
        router.get("/tv/:id", (req, res) => this.getSpecificTvShowData(req,res));
        return router;
    }

    private async getSpecificTvShowData(req: Request, res: Response){
        const id = Number(req.params.id);
        if(Number.isNaN(id))
            return ;

        try{
            const tvShow = await this._tvShowService.getSpecificTvShowData(id);
            res.send(tvShow);
        } catch {
            res.status(500).send('Internal Server Error');
        }
    }

    private async getTrendingTvShows(req: Request, res: Response) {
        try{
            const tvShows = await this._tvShowService.getTrendingTvShowsAsync();
            res.send(tvShows);
        } catch {
            res.status(500).send('Internal Server Error');
        }
    }
}