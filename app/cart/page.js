import { Container } from "@mui/material";
import { auth } from "../../auth";
import Navbar from "../components/Navbar";
import { getUserInfo } from "../lib/auth_api";

const Cart = async () => {
  let session = await auth();
  let userInfo = await getUserInfo(session?.user?.accessToken)
  
  if (userInfo.code === 401) {
     session = null;
  }
  return (
    <Container maxWidth="xl" sx={{ mb: "100vh" }}>
      <Navbar username={session?.user?.username}/>
    </Container>
  );
};

export default Cart;
