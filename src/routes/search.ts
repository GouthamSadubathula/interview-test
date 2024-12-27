import express from "express";
import { searchMovies } from "../controllers/moviesController";

const searchRoute = express.Router();

searchRoute.get("/", searchMovies);

export default searchRoute;
