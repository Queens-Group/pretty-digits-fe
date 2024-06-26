import { auth } from "@/auth";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import { getAvailableProducts } from "./lib/product_api";


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
      <ProductList
        initialProducts={products}
        size={SIZE_PER_PAGE}
        accessToken={session?.user?.accessToken}
      />
    </Container>
  );
}
