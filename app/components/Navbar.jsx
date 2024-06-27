"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

import WifiTetheringErrorTwoToneIcon from "@mui/icons-material/WifiTetheringErrorTwoTone";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import { usePathname, useRouter } from "next/navigation";
import { SignInBtn } from "./SignInBtn";

import { Grid } from "@mui/material";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuDrawer from "./MenuDrawer";
import { doLogout } from "../actions";

const useStyles = {
  backgroundColor: "#f8f9fa", // Light grey background
  height: "80px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "none",
  padding: "0 5px",
  zIndex: 9999,
  color: "#343a40", // Dark grey text
};

const Navbar = ({ username }) => {
  const path = usePathname();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerState, setDrawerState] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };

  if (username === undefined) doLogout();

  return (
    <AppBar position="fixed" sx={useStyles}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <WifiTetheringErrorTwoToneIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 400,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              PrettyDigits
            </Typography>
            <WifiTetheringErrorTwoToneIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              PrettyDigits
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Grid container justifyContent="center" alignItems="center">
              <Grid
                item
                sx={{ mr: 2, fontWeight: 500, display: { xs: "none" } }}
              >
                {username}
              </Grid>
              <Grid
                item
                onClick={handleClick}
                sx={{ mr: 2, display: { xs: "none" } }}
              >
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Default Pic" src="./female_avatar.png" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={toggleDrawer(true)}>
                  <MenuOutlinedIcon
                    sx={{ fontSize: "30px", cursor: "pointer" }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
        <MenuDrawer
          state={drawerState}
          toggleDrawer={toggleDrawer}
          username={username}
        />
      </Container>
    </AppBar>
  );
};

export default Navbar;
