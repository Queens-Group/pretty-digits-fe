import React from 'react'
import styles from "./product-card.module.css"

export function ProductCard({ simNumber, price, validity, description }){
  return (
    <div className={styles.card}>
      <div className={styles.leftSide}>
        {simNumber}
      </div>
      <div className={styles.middleSide}>
        <div className={styles.price}>
          {price}
        </div>
        <div className={styles.validity}>
          Validity: {validity}
        </div>
        <div className={styles.description}>
          {description}
        </div>
      </div>
      <div className={styles.rightSide}>
        <button className={styles.addToCartButton}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
