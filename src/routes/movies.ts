import express from "express";
import {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/moviesController";

const router = express.Router();

router.get("/", getMovies);
router.post("/", addMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
