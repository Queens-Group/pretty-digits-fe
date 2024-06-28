import { Container } from "@mui/material";
import { auth } from "../../auth";
import Navbar from "../components/Navbar";
import styles from "./page.module.css"
import { getUserInfo } from "../lib/auth_api";

const Cart = async () => {
  let session = await auth();
  //let userInfo = await getUserInfo(session?.user?.accessToken)
  
  // if (userInfo?.code === 401 || userInfo === null) {
  //    session = null;
  // }
  
  return (
    <Container maxWidth="xl">
      <Navbar username={session?.user.username}/>
      <div className={styles.container}>
        <div className={styles.leftContainer}>left</div>
        <div className={styles.rightContainer}>right</div>
      </div>
    </Container>
  );
};

export default Cart;
