import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, IconButton, Link, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        textAlign: "center",
      }}
    >
      <Typography variant="body1" color="text.primary">
        Desenvolvido por{" "}
        <Link
          href="https://github.com/kaicmurilo"
          target="_blank"
          rel="noopener"
          color="secondary"
          underline="hover"
        >
          Kaic Nunes
        </Link>
      </Typography>
      <Box sx={{ mt: 1 }}>
        <IconButton
          href="https://github.com/kaicmurilo"
          target="_blank"
          rel="noopener"
          color="secondary"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          href="https://www.linkedin.com/in/kaic-murilo-nunes-461238112/"
          target="_blank"
          rel="noopener"
          color="secondary"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        © {new Date().getFullYear()} Venda de Ingressos. Todos os direitos
        reservados.
      </Typography>
    </Box>
  );
}

export default Footer;
