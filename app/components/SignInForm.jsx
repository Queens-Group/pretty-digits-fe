"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import IconButton from '@mui/material/IconButton';
import { Backdrop, CircularProgress } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import AppAlert from "./AppAlert";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from "../actions";
import { postSignIn } from "../lib/auth_api";
import { HomeMaxOutlined, HomeOutlined } from "@mui/icons-material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        PreetyDigits.shop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInForm() {
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setUnexpectedError] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const credential = {
        username: formData.get("username"),
        password: formData.get("password"),
      };
      const response = await postSignIn(credential);

      if (response.code === 200) {
        await doCredentialLogin(response.data);
        redirectToHomepage();
      } else if (response.code === 401) {
        setErrors({
          username: "invalid credential",
          password: "invalid credential",
        });
      } else if (response.code === 400) {
        setErrors(response.data);
      } else {
        setUnexpectedError(true);
      }
    } catch (error) {
      setIsLoading(false);
      setUnexpectedError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToHomepage = () => {
    router.push("/");
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ overflow: "hidden" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: 9999, position: "absolute" }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <AppAlert
        title={"Application Error"}
        color="danger"
        message="Something went wrong. Please try again later!"
        show={error}
        handleClose={() => setUnexpectedError(false)}
        icon={<ReportIcon />}
      />

      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          container
          justifyContent="flex-start"
        >
          <Grid item>
            <IconButton onClick={() => router.push("/")}>
              <HomeOutlined fontSize="large" sx={{borderBottom: "solid 1px black"}}/>
            </IconButton>
          </Grid>
        </Grid>
        <Avatar sx={{ m: 1, bgcolor: "#b79347" }}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
          autoComplete="off"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username/phone"
            name="username"
            error={!!errors.username}
            helperText={errors.username ? errors.username : ""}
            autoFocus
            autoComplete="off"
            inputProps={{ autoComplete: "off" }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={!!errors.password}
            helperText={errors.password ? errors.password : ""}
            autoComplete="current-password"
            inputProps={{ autoComplete: "off" }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#b79347",
              ":hover": { bgcolor: "#a67c37" },
            }}
          >
            Sign In
          </Button>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item alignItems="center">
              <Link href="/auth/signup" variant="body2">
                {"Does not have an account yet? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 2, mb: 4 }} />
    </Container>
  );
}
