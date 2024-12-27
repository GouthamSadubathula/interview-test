import express from "express";
import moviesRoute from "./routes/movies";
import searchRoute from "./routes/search";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/movies", moviesRoute);
app.use("/search", searchRoute);

export default app;
