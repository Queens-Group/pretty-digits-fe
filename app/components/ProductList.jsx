"use client";
import { Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getAvailableProducts } from "../lib/product_api";
import { ProductCard } from "./ProductCard";
import SortSelect from "./SortSelect";

const sortPrice = [
  { name: "termurah", value: "asc" },
  { name: "termahal", value: "desc" },
];

const ProductList = ({ initialProducts, size, accessToken }) => {
  const [page, setPage] = React.useState(1);
  const [products, setProducts] = React.useState(initialProducts);
  const [error, setError] = React.useState(false);
  const [sort, setSort] = React.useState("");
  const [totalElements, setTotalElements] = React.useState(0);
  const { ref, inView } = useInView();

  const sortPriceAsc = (a, b) => a.price - b.price;
  const sortPriceDesc = (a, b) => b.price - a.price;
  const sortProducts = () => {
    const sortedProducts = [...products].sort(
      sort === "asc" ? sortPriceAsc : sortPriceDesc
    );
    setProducts(sortedProducts);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    let isSubscribed = true;
    const loadMoreProducts = async () => {
      const response = await getAvailableProducts({ page, size });
      const newProducts = response?.data?.content || [];
      const sorted = [...products, ...newProducts].sort(
        sort === "asc" ? sortPriceAsc : sortPriceDesc
      );
      if (isSubscribed) {
        setProducts(sorted);
        setPage((prev) => prev + 1);
        setTotalElements(response?.data?.page?.totalElements);
        setError(false);
      }
    };
    if (inView) {
      loadMoreProducts().catch((err) => {
        if (isSubscribed) {
          setError(true);
        }
      });
    }
    return () => (isSubscribed = false);
  }, [inView]);

  useEffect(() => {
    if (sort) {
      sortProducts();
    }
  }, [sort]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      <div>
        <SortSelect
          items={sortPrice}
          onSelect={handleSort}
          placeHolder={"price"}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            simNumber={product.number}
            price={product.price}
            validity={product.validityPeriod}
            description={product.description}
            provider={product.provider}
            productId={product.id}
            accessToken={accessToken}
          />
        ))}
      </div>

      {products.length !== totalElements && !error && (
        <Skeleton
          variant="rectangular"
          sx={{
            display: "flex",
            height: { xs: "100px", md: "200px" },
            borderRadius: "8px",
          }}
        />
      )}
      {products.length === totalElements && !error && (
        <div
          style={{
            textAlign: "center",
            color: "#888",
            padding: "20px",
            fontSize: "1rem",
          }}
        >
          No More Products
        </div>
      )}

      {error && (
        <div
          style={{
            textAlign: "center",
            color: "#888",
            padding: "10px",
            fontSize: "1rem",
          }}
        >
          Failed to fetch data. Please refresh the page or try again later.
        </div>
      )}
      <div ref={ref}></div>
    </div>
  );
};

export default ProductList;
