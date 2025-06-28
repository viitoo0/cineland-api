import { Router } from "express";
import { container } from "tsyringe";
import { MovieController } from "../controllers/movies";
import { TvShowController } from "../controllers/tvshow";

const controllers = [
    MovieController,
    TvShowController
];

const routes = Router();

controllers.forEach((controllerClass: any) => {
    const controller: any = container.resolve(controllerClass);
    routes.use(controller.registerRoutes());
});

export default routes;