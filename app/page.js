import { Container, CssBaseline, Divider } from "@mui/material";
import { ProductCard } from "./components/ProductCard";
import SortSelect from "./components/Select";
import BasicPagination from "./components/BasicPagination";
import { auth } from "@/auth";
import Navbar from "./components/Navbar";
import { getAvailableProducts } from "./lib/product_api";
import ProductList from "./components/ProductList";

const sortPrice = [
  { name: "termurah", value: "price,asc" },
  { name: "termahal", value: "price,desc" },
];

export default async function Home() {
  const session = await auth();
  const SIZE_PER_PAGE = 20;
  const responseGetProducts = await getAvailableProducts({
    page: 0,
    size: SIZE_PER_PAGE,
  });
  const products = responseGetProducts?.data?.content || [];

  
  return (
    <Container sx={{ mt: 15, mb: 10 }} maxWidth="md">
      <Navbar username={session?.user?.username} />
     
      
      <div>
      <ProductList
        initialProducts={products}
        size={SIZE_PER_PAGE}
        accessToken={session?.user?.accessToken}
      />
      </div>
    </Container>
  );
}
