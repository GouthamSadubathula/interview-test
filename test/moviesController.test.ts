import request from "supertest";
import app from "../src/app";
import db from "../src/db/dbconnect";

jest.mock("../src/db/dbconnect");

describe("testing GET /movies API", () => {
  it("should return the list of movies", async () => {
    const mockMovies = [
      {
        title: "Mocked Movie 1",
        genre: "drama",
        rating: 9.2,
        streaming_link: "localhost:3000",
      },
      {
        title: "Mocked Movie 2",
        genre: "drama",
        rating: 2.9,
        streaming_link: "localhost:4000",
      },
      {
        title: "Mocked Movie 3",
        genre: "fantasy",
        rating: 2.79,
        streaming_link: "localhost:5000",
      },
    ];

    (db.any as jest.Mock).mockResolvedValueOnce(mockMovies);

    const response = await request(app).get("/movies");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(mockMovies);
  });

  it("should handle errors", async () => {
    (db.any as jest.Mock).mockRejectedValueOnce(new Error("Random Error"));

    const response = await request(app).get("/movies");

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual("Failed to fetch the movies");
  });
});

describe("test GET /search with query API", () => {
  it("should return search results on query title", async () => {
    const mockSearchMovieResults = [
      {
        title: "MockInception",
        genre: "Sci-Fi",
        rating: 9.0,
        streaming_link: "http://mock.com",
      },
    ];
    (db.any as jest.Mock).mockResolvedValueOnce(mockSearchMovieResults);

    const response = await request(app).get("/search?movie=mockinception");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(mockSearchMovieResults);
  });

  it("should return search results on query genre", async () => {
    const mockSearchGenreResults = [
      {
        title: "MockInterstellar",
        genre: "Sci-Fi",
        rating: 8.6,
        streaming_link: "http://mock.com",
      },
    ];
    (db.any as jest.Mock).mockResolvedValueOnce(mockSearchGenreResults);

    const response = await request(app).get("/search?genre=Sci-Fi");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(mockSearchGenreResults);
  });

  it("should handle errors", async () => {
    (db.any as jest.Mock).mockRejectedValueOnce(new Error("Random error"));

    const response = await request(app).get("/search?genre=Action");

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Failed to search the movies");
  });
});
