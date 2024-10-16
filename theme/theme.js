// theme.js
import { DarkTheme as DT, DefaultTheme } from "@react-navigation/native";

const colors = {
  light: {
    primary: "#060635",
    background: "#f2f4fc",
    secondary: "#e2b623",
    card: "#FAFAFA",
    text: "#060635",
    border: "#060635",
    notification: "#FFFFFF",
    textSec: "#666666",
    placeholder: "#888888",
    statusBar: "#49ACE1",
    focused: "#0F5D9F",
    positive: "#ffffff",
    negative: "#000000",
    sentChat: "#49ACE1",
  },
  dark: {
    primary: "#49ACE1",
    background: "#101010",
    card: "#29292E",
    text: "#FFF",
    border: "#6F6F6F",
    notification: "#787676",
    textSec: "#FFFFFF",
    placeholder: "#FFFFFF",
    statusBar: "#29292E",
    focused: "#49ACE1",
    positive: "#000000",
    negative: "#ffffff",
    sentChat: "#060635",
  },
};

const LightTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, ...colors.light },
};

const DarkTheme = {
  ...DT,
  colors: { ...DT.colors, ...colors.dark },
};

export { LightTheme, DarkTheme }; // Ensure you only export these
