import { Container } from "@mui/material";
import { auth } from "../../auth";
import CartCheckout from "../components/CartCheckout";
import CartWrapper from "../components/CartWrapper";
import Navbar from "../components/Navbar";
import { getUserInfo } from "../lib/auth_api";
import { getCart } from "../lib/cart_api";
import styles from "./page.module.css";

const Cart = async () => {
  let session = await auth();
  let userInfo = null;
  let cart = {};
  try {
    const response = await getCart(session?.user?.accessToken);
    userInfo = await getUserInfo(session?.user?.accessToken);
    cart = response.data;
  } catch (err) {
    console.log({ cart: err.message });
  }

  if (userInfo?.code === 401 || userInfo === null) {
    session = null;
  }

  return (
    <Container maxWidth="xl">
      <Navbar username={session?.user?.username} />
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <CartWrapper
            addresses={cart?.addresses || []}
            cartItems={cart?.cartItems || []}
            cartId={cart?.cartId}
            accessToken={session?.user?.accessToken}
          />
        </div>
        <div className={styles.rightContainer}>
          <CartCheckout
            total={cart?.totalPrice}
            accessToken={session?.user?.accessToken}
          />
        </div>
      </div>
    </Container>
  );
};

export default Cart;
