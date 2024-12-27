import express from "express";
import db from "../db/dbconnect";

export const getMovies = async (
  request: express.Request,
  response: express.Response,
) => {
  try {
    const movies = await db.any(
      `SELECT title, genre, rating, streaming_link FROM movies`,
    );
    response.status(200).json({ success: true, data: movies });
  } catch (error) {
    console.log("Error fetching movies: " + error);
    response
      .status(500)
      .json({ success: false, message: "Failed to fetch the movies" });
  }
};

export const searchMovies = async (
  request: express.Request,
  response: express.Response,
) => {
  const { movie, genre } = request.query;
  let sqlQuery: string = `SELECT title, genre, rating, streaming_link FROM movies WHERE TRUE`;
  const values: string[] = [];

  if (movie) {
    sqlQuery += ` AND title ILIKE $1`;
    values.push(`%${movie}%`);
  }
  if (genre) {
    if (values.length > 0) {
      sqlQuery += ` AND genre ILIKE $2`;
    } else {
      sqlQuery += ` AND genre ILIKE $1`;
    }
    values.push(`%${genre}%`);
  }

  try {
    const searchResults = await db.any(sqlQuery, values);
    response.status(200).json({ success: true, data: searchResults });
  } catch (error) {
    console.log("Error searching movies: " + error);
    response
      .status(500)
      .json({ success: false, message: "Failed to search the movies" });
  }
};
