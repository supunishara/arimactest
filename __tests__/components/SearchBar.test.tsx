import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/SearchBar";

describe("SearchBar", () => {
  it("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(<SearchBar value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "test" } });

    expect(handleChange).toHaveBeenCalledWith("test");
  });

  it("displays the current value", () => {
    render(<SearchBar value="test movie" onChange={() => {}} />);

    const input = screen.getByPlaceholderText("Search");
    expect(input).toHaveValue("test movie");
  });
});
