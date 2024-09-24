import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { Web3Provider } from "./context/Web3Context";
import getDesignTokens from "./theme/theme";

function Root() {
  const [mode, setMode] = useState("light");

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Web3Provider>
            <ErrorBoundary>
              <App toggleColorMode={toggleColorMode} mode={mode} />
            </ErrorBoundary>
          </Web3Provider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
