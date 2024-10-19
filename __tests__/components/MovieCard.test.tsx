import { render, screen } from "@testing-library/react";
import MovieCard from "@/components/MovieCard";

const mockMovie = {
  id: 1,
  title: "Test Movie",
  poster_path: "/test.jpg",
  overview: "Test overview",
  release_date: "2024-01-01",
  vote_average: 8.5,
};

describe("MovieCard", () => {
  it("renders movie information correctly", () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Test overview")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("8.5")).toBeInTheDocument();
  });

  it("handles missing poster image", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(<MovieCard movie={movieWithoutPoster} />);

    const fallbackImage = screen.getByAltText("Test Movie");
    expect(fallbackImage).toHaveAttribute("src", "/placeholder-image.jpg");
  });
});
