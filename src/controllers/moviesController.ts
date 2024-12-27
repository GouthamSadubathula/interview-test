import express from "express";
import db from "../db/dbconnect";

export const getMovies = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
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
): Promise<void> => {
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

export const addMovie = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const { title, genre, rating, streaming_link } = request.body;

  let insertSqlQuery = `INSERT INTO movies (title, genre, rating, streaming_link) VALUES ($1, $2, $3, $4)`;

  if (!title || !genre || !rating || !streaming_link) {
    response
      .status(400)
      .json({ success: false, message: "Some fields are missing" });
  }

  try {
    await db.none(insertSqlQuery, [title, genre, rating, streaming_link]);
    response
      .status(201)
      .json({ success: true, message: "Movie added to the database" });
  } catch (error) {
    console.error("Error adding movie: ", error);
    response
      .status(500)
      .json({ success: false, message: "Failed to add the movie" });
  }
};

export const updateMovie = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const { id } = request.params;
  const { title, genre, rating, streaming_link } = request.body;

  let updateSqlQuery = `UPDATE movies SET 
        title = COALESCE($1, title),
        genre = COALESCE($2, genre),
        rating = COALESCE($3, rating),
        streaming_link = COALESCE($4, streaming_link)
      WHERE id = $5`;
  try {
    const result = await db.result(updateSqlQuery, [
      title,
      genre,
      rating,
      streaming_link,
      id,
    ]);

    if (result.rowCount === 0) {
      response.status(404).json({ success: false, message: "Movie not found" });
    }

    response
      .status(200)
      .json({ success: true, message: "Movie updated successfully" });
  } catch (error) {
    console.error("Error updating movie: ", error);
    response
      .status(500)
      .json({ success: false, message: "Failed to update the movie" });
  }
};

export const deleteMovie = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const { id } = request.params;
  let deleteSqlQuery = `DELETE FROM movies WHERE id = $1`;

  try {
    const result = await db.result(deleteSqlQuery, [id]);

    if (result.rowCount === 0) {
      response.status(404).json({ success: false, message: "Movie not found" });
    }

    response
      .status(200)
      .json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie: ", error);
    response
      .status(500)
      .json({ success: false, message: "Failed to delete the movie" });
  }
};
