import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const pgp = pgPromise();

const db = pgp({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "movielobby",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL database!"))
  .catch((error) =>
    console.error("Failed to connect to PostgreSQL database: " + error),
  );

export default db;
