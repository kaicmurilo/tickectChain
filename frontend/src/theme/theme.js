const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Paleta para modo claro
          primary: {
            main: "#1A237E", // Azul Escuro
          },
          secondary: {
            main: "#FF6F00", // Laranja Vibrante
          },
          success: {
            main: "#00C853", // Verde Tecnológico
          },
          warning: {
            main: "#FFEB3B", // Amarelo
          },
          background: {
            default: "#F5F5F5", // Cinza Claro
            paper: "#FFFFFF", // Branco
          },
          text: {
            primary: "#000000", // Preto
            secondary: "#9E9E9E", // Cinza Médio
          },
        }
      : {
          // Paleta para modo escuro
          primary: {
            main: "#90caf9", // Azul Claro para modo escuro
          },
          secondary: {
            main: "#FF6F00", // Laranja Vibrante (mantido)
          },
          success: {
            main: "#00C853", // Verde Tecnológico
          },
          warning: {
            main: "#FFEB3B", // Amarelo
          },
          background: {
            default: "#121212", // Cinza Muito Escuro
            paper: "#1e1e1e", // Cinza Escuro
          },
          text: {
            primary: "#FFFFFF", // Branco
            secondary: "#BDBDBD", // Cinza Claro
          },
        }),
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    // Definição de variantes tipográficas
    h1: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 500,
      fontSize: "2rem",
    },
    h3: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 500,
      fontSize: "1.75rem",
    },
    h4: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    body1: {
      fontFamily: "Roboto, sans-serif",
      fontWeight: 300,
      fontSize: "1rem",
    },
    button: {
      fontFamily: "Montserrat, sans-serif",
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    // Personalização de componentes específicos
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 20px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 500,
          fontSize: "1.5rem",
        },
      },
    },
  },
});

export default getDesignTokens;
