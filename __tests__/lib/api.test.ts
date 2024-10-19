import { fetchMoviesAPI } from "@/lib/api";
import { describe, beforeEach, afterEach, it } from "node:test";

describe("fetchMoviesAPI", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch popular movies when no query is provided", async () => {
    const mockResponse = {
      results: [{ id: 1, title: "Test Movie" }],
      total_pages: 1,
      page: 1,
      total_results: 1,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchMoviesAPI();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/movie/popular")
    );
    expect(result.movies).toEqual(mockResponse.results);
  });

  it("should fetch searched movies when query is provided", async () => {
    const query = "test movie";
    const mockResponse = {
      results: [{ id: 1, title: "Test Movie" }],
      total_pages: 1,
      page: 1,
      total_results: 1,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchMoviesAPI(query);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/search/movie")
    );
    expect(result.movies).toEqual(mockResponse.results);
  });

  it("should handle API errors", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ status_message: "API Error" }),
    });

    await expect(fetchMoviesAPI()).rejects.toThrow("API Error");
  });
});
