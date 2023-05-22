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
    primary: true;
  }
  interface CircularProgressPropsColorOverrides {
    white: true;
    primary: true;
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
        main: "#C73E1D",
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
