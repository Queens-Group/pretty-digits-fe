"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import WifiTetheringErrorTwoToneIcon from "@mui/icons-material/WifiTetheringErrorTwoTone";
import { SignInBtn } from "./SignInBtn";
import { useRouter } from "next/navigation";
import { doLogout } from "../actions";
import zIndex from "@mui/material/styles/zIndex";
import { Grid } from "@mui/material";

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
const settings = ["Cart", "My Orders", "Dashboard", "Logout"];

const Navbar = ({ username }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter();

  if (username === undefined) router.push("/");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={useStyles}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WifiTetheringErrorTwoToneIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
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

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            {username ? (
              <Grid container justifyContent="center" alignItems="center">
                <Grid item sx={{mr: 2, fontWeight: 500}}>{username}</Grid>
                <Grid item>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="./female_avatar.png"
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            ) : (
              <SignInBtn />
            )}
            <Menu
              sx={{ mt: "45px", zIndex: 9999 }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                if (setting === "Logout") {
                  return (
                    <MenuItem
                      key={setting}
                      onClick={async () => await doLogout()}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
