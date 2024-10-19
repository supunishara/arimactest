import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import HomePage from "@/components/HomePage";
import { NextIntlClientProvider } from "next-intl";
import { expect } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";

// Mock messages
const messages = {
  movies: {
    popularMovies: "Popular Movies",
    searchResults: "Search Results",
    noMoviesFound: "No movies found",
    loading: "Loading...",
  },
};

const mockInitialData = {
  movies: [
    { id: 1, title: "Test Movie 1" },
    { id: 2, title: "Test Movie 2" },
  ],
  totalPages: 1,
  currentPage: 1,
  totalResults: 2,
};

describe("HomePage", () => {
  const renderWithProviders = (component: React.ReactElement) => {
    const store = makeStore();
    return render(
      <Provider store={store}>
        <NextIntlClientProvider messages={messages} locale="en">
          {component}
        </NextIntlClientProvider>
      </Provider>
    );
  };

  it("renders initial movies", () => {
    renderWithProviders(<HomePage initialData={mockInitialData} />);

    expect(screen.getByText("Popular Movies")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
  });

  it("handles search input", async () => {
    renderWithProviders(<HomePage initialData={mockInitialData} />);

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });

    await waitFor(() => {
      expect(screen.getByText("Search Results")).toBeInTheDocument();
    });
  });

  it("handles pagination", async () => {
    renderWithProviders(<HomePage initialData={mockInitialData} />);

    const nextButton = screen.getByLabelText("Next page");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Page 2")).toBeInTheDocument();
    });
  });
});
