import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Button, IconButton, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

function Navbar({ toggleColorMode, mode }) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: "Montserrat, sans-serif" }}
        >
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Blockchain Tickets
          </Link>
        </Typography>

        <Button color="inherit" component={Link} to="/buy-tickets">
          Comprar Ingressos
        </Button>
        <Button color="inherit" component={Link} to="/my-account">
          Minha Conta
        </Button>

        <Tooltip title="Alternar Modo">
          <IconButton color="inherit" onClick={toggleColorMode}>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
