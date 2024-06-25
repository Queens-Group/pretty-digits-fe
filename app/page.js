import { Container } from "@mui/material";
import { ProductCard } from "./components/ProductCard";
import SortSelect from "./components/Select";
import BasicPagination from "./components/BasicPagination";
import { auth } from "@/auth";
import Navbar from "./components/Navbar";
import { getAvailableProducts } from "./lib/product_api";

export default async function Home() {
  const session = await auth();
  const responseGetProducts = await getAvailableProducts({});
  const products = responseGetProducts?.data?.content || [];
  


  const sortPrice = [{name: "termurah", value: "price,asc"}, {name: "termahal", value: "price,desc"}]
  return (
    <Container sx={{ mt: 15, mb: 10 }} maxWidth="md">
      <Navbar username={session?.user?.username} />
      <div>
        <SortSelect items={sortPrice}/>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            simNumber={product.number}
            price={product.price}
            validity={product.validityPeriod}
            description={product.description}
            provider={product.type}
            productId={product.id}
            accessToken={session?.user?.accessToken}
          />
        ))}
      </div>
      <div>
        <BasicPagination />
      </div>
    </Container>
  );
}
