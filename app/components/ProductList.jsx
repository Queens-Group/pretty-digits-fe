"use client";
import React, { useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { getAvailableProducts } from "../lib/product_api";
import { useInView } from "react-intersection-observer";
import SortSelect from "./Select";

const sortPrice = [
  { name: "termurah", value: "price,asc" },
  { name: "termahal", value: "price,desc" },
];

const ProductList = ({ initialProducts, size, accessToken }) => {
  const [page, setPage] = React.useState(1);
  const [products, setProducts] = React.useState(initialProducts);
  const { ref, inView } = useInView();

  const loadMoreProducts = async () => {
    const response = await getAvailableProducts({ page, size });
    const newProducts = response?.data?.content || [];
    setProducts([...products, ...newProducts]);
    setPage(page + 1);
  };

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      <div>
        <SortSelect items={sortPrice} />
      </div>
      
        {products.map((product) => (
          <ProductCard
            key={product.id}
            simNumber={product.number}
            price={product.price}
            validity={product.validityPeriod}
            description={product.description}
            provider={product.type}
            productId={product.id}
            accessToken={accessToken}
          />
        ))}
      
      <div ref={ref}>Loading...</div>
    </div>
  );
};

export default ProductList;
