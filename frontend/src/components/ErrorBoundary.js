import { Box, Typography } from "@mui/material";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            padding: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" color="error" gutterBottom>
            Algo deu errado.
          </Typography>
          <Typography variant="body1">
            Por favor, tente recarregar a página ou entre em contato com o
            suporte.
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
