import express from "express";
import moviesRoute from "./routes/movies";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/movies", moviesRoute);

export default app;
