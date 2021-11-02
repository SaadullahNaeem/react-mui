import React from "react";
import Link from "@mui/material/Link";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export function Header() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          <Link href="/" color="inherit">Procom Employees</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
