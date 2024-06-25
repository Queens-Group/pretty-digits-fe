import { Container } from "@mui/material";
import React from "react";
import SignUpForm from "@/app/components/SignUpForm";

const SignUpPage = () => {
  return (
    <Container maxWidth="xl" sx={{overflowY: 'hidden'}}>
      <SignUpForm/>
    </Container>
  );
};

export default SignUpPage;
