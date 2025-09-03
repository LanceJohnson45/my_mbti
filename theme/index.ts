import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      "50": "#FFF5F7",
      "100": "#FED7E2",
      "200": "#FBB6CE",
      "300": "#F687B3",
      "400": "#ED64A6",
      "500": "#D53F8C",
      "600": "#B83280",
      "700": "#97266D",
      "800": "#702459",
      "900": "#521B41",
    },
    secondary: {
      "50": "#FFFAF0",
      "100": "#FEEBC8",
      "200": "#FBD38D",
      "300": "#F6AD55",
      "400": "#ED8936",
      "500": "#DD6B20",
      "600": "#C05621",
      "700": "#9C4221",
      "800": "#7B341E",
      "900": "#652B19",
    },
    pastel: {
      pink: "#FFC0CB",
      lavender: "#E6E6FA",
      mint: "#98FB98",
      peach: "#FFDAB9",
      skyBlue: "#87CEEB",
    }
  },
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Nunito', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "#FFF5F7",
      }
    }
  },
});

export default theme;
