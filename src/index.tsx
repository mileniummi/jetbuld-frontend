import * as React from "react";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import ReactDOM from "react-dom";
import { getPalette } from "./MuiPalette";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const theme = getPalette();

const app = (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
