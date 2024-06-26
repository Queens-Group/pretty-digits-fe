"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { signUp } from "../lib/auth_api";
import { Backdrop, CircularProgress } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import AppAlert from "./AppAlert";
import { useRouter } from "next/navigation";

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

export default function SignUpForm({session}) {
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setUnexpectedError] = React.useState(false);
  const router = useRouter();

  if (session) {
    router.replace("/")
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    const data = new FormData(event.currentTarget);
    data.set("role", "USER");

    try {
      setIsLoading(true);
      const response = await signUp(data);

      switch (response.code) {
        case 400:
          setErrors(response.data);
          break;
        case 409:
          setErrors({
            username: "username or phone already taken",
            phone: "username or phone already taken",
          });
          break;
        case 201:
          setIsLoading(false);
          setIsSuccess(true);
          redirectToSignInPage();
          break;
        default:
          setUnexpectedError(true);
          break;
      }
    } catch (error) {
      setUnexpectedError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToSignInPage = () => {
    let timer = setTimeout(() => router.push("/auth/signin"), 2000);
    return () => clearTimeout(timer);
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
        title={"Success Register"}
        color="success"
        message="Registration successful. Please log in!"
        show={isSuccess}
        handleClose={() => setIsSuccess(false)}
        icon={<CheckCircleIcon />}
      />

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
        <Avatar sx={{ m: 1, bgcolor: "#b79347" }}>
          <AppRegistrationOutlinedIcon />
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
            id="fullname"
            label="Full Name"
            name="fullname"
            autoComplete="name"
            error={!!errors.fullName}
            helperText={errors.fullName ? errors.fullName : ""}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
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
            id="phone"
            label="Mobile Phone"
            name="phone"
            autoComplete="phone"
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone : ""}
            autoFocus
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
            autoComplete="new-password"
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
            Sign Up
          </Button>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item alignItems="center">
              <Link href="/auth/signin" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 2, mb: 4 }} />
    </Container>
  );
}
