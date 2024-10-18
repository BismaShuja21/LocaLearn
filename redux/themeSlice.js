// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light", // or 'dark'
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setLightTheme: (state) => {
      state.theme = "light"; // Action to explicitly set theme to light
    },
  },
});

export const { toggleTheme, setLightTheme } = themeSlice.actions;
export default themeSlice.reducer;
