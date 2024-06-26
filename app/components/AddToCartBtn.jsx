"use client";
import React from "react";
import styles from "./AddToCartBtn.module.css";
import AppAlert from "./AppAlert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportIcon from "@mui/icons-material/Report";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { useRouter } from "next/navigation";
import { addItemToCart } from "../lib/cart_api";

const AddToCartBtn = ({ productId, accessToken }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isDuplicate, setIsDuplicate] = React.useState(false);
  const [error, setUnexpectedError] = React.useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    try {
      const response = await addItemToCart(productId, accessToken);

      if (response.code === 401 || response.code === 403) {
        router.push("/auth/signin");
      } else if (response.code === 200) {
        setIsSuccess(true);
      } else if (response.code == 409) {
        setIsDuplicate(true);
      } else {
        setUnexpectedError(true);
      }
    } catch (err) {
      setUnexpectedError(true);
    }
  };
  return (
    <div>
      <AppAlert
        title={"Success Add Item to Cart"}
        color="success"
        message="Item has been added to cart"
        show={isSuccess}
        handleClose={() => setIsSuccess(false)}
        icon={<CheckCircleIcon />}
      />
      <AppAlert
        title={"Failed added item to cart"}
        color="warning"
        message="This item is already in your cart"
        show={isDuplicate}
        handleClose={() => setIsDuplicate(false)}
        icon={<ReportProblemOutlinedIcon />}
      />
      <AppAlert
        title={"Application Error"}
        color="danger"
        message="Something went wrong. Please try again later!"
        show={error}
        handleClose={() => setUnexpectedError(false)}
        icon={<ReportIcon />}
      />
      <button
        className={styles.addToCartButton}
        onClick={() => handleAddToCart()}
      >
        Add to Cart
      </button>
      ;
    </div>
  );
};

export default AddToCartBtn;
