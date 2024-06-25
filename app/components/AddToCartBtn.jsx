import React from 'react'
import styles from "./AddToCartBtn.module.css"

const AddToCartBtn = ({productId, accessToken}) => {
  return (
    <button className={styles.addToCartButton}>
          Add to Cart
        </button>
  )
}

export default AddToCartBtn