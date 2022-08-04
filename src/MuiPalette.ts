import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    icon: Palette["primary"];
    white: Palette["primary"];
  }
  interface PaletteOptions {
    icon: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    icon: true;
  }
  interface CircularProgressPropsColorOverrides {
    white: true;
  }
}

declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    white: true;
  }
}

export const getPalette = () => {
  return createTheme({
    palette: {
      primary: {
        main: "#154d3b",
      },
      error: {
        main: "#8b0000",
      },
      icon: {
        main: "black",
      },
      white: {
        main: "white",
      },
    },
  });
};