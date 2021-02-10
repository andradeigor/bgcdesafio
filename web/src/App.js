import React from "react";
import Header from "./components/Header/index";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Intro from "./components/Intro/index";
import Catalog from "./components/Catalog/index";
import Orderform from "./components/OrderForm/index";

const App = () => {
  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: "#3C3B3F",
      },
      background: {
        main: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"],
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Intro />
      <Catalog />
      <Orderform />
    </ThemeProvider>
  );
};

export default App;
