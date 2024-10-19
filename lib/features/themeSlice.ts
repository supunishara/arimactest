import { createSlice } from "@reduxjs/toolkit";

// Get initial state from localStorage if available, otherwise default to light mode
const getInitialState = () => {};

const themeSlice = createSlice({
  name: "theme",
  initialState: getInitialState(),
  reducers: {
    toggleTheme: (state) => {},
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
