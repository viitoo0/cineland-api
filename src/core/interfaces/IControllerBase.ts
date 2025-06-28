import { Router } from "express";

export interface IControllerBase {
    registerRoutes(): Router;
}