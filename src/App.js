import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import { Header, List, Create } from "./components";

const theme = createTheme();

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main style={{ marginBottom: "25px" }}>
          <Switch>
            <Route component={Create} path="/:id"></Route>
            <Route component={List} path="/"></Route>
          </Switch>
        </main>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
