import express from "express";
import db from "../db/dbconnect";

export const getMovies = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const movies = await db.any("SELECT * FROM movies");
    res.status(200).json({ success: true, data: movies });
  } catch (error) {
    console.log("Error fetching movies: " + error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch the movies" });
  }
};
