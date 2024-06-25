import Image from "next/image";
import styles from "./page.module.css";
import { Container } from "@mui/material";
import { ProductCard } from "./components/ProductCard";
import SortSelect from "./components/Select";
import BasicPagination from "./components/BasicPagination";
import { SignInBtn } from "./components/SignInBtn";

export default function Home() {
  const products = [{
    id: 1,
    simNumber: "1234-5678-9012-3456",
    price: "$49.99",
    validity: "30 days",
    description: "This is a premium SIM card with excellent network coverage.",
  },
  {
    id: 2,
    simNumber: "2345-6789-0123-4567",
    price: "$59.99",
    validity: "60 days",
    description: "This is another premium SIM card with even better network coverage and additional benefits. Get yours today and enjoy seamless connectivity.",
  },
  {
    id: 3,
    simNumber: "3456-7890-1234-5678",
    price: "$69.99",
    validity: "90 days",
    description: "Upgrade your connectivity with our premium SIM card. Experience lightning-fast speeds and reliable network coverage.",
  },
  {
    id: 4,
    simNumber: "4567-8901-2345-6789",
    price: "$79.99",
    validity: "120 days",
    description: "Stay connected with our premium SIM card, designed for those who demand the best.",
  },
  {
    id: 5,
    simNumber: "5678-9012-3456-7890",
    price: "$89.99",
    validity: "150 days",
    description: "Experience the next level of connectivity with our premium SIM card. Faster speeds, better coverage, and more benefits.",
  },
  {
    id: 6,
    simNumber: "6789-0123-4567-8901",
    price: "$99.99",
    validity: "180 days",
    description: "Upgrade to our premium SIM card and enjoy unparalleled network coverage and lightning-fast speeds.",
  },
  {
    id: 7,
    simNumber: "7890-1234-5678-9012",
    price: "$109.99",
    validity: "210 days",
    description: "Stay connected wherever you go with our premium SIM card. Enjoy fast speeds and reliable network coverage.",
  },
  {
    id: 8,
    simNumber: "8901-2345-6789-0123",
    price: "$119.99",
    validity: "240 days",
    description: "Upgrade your connectivity with our premium SIM card. Experience seamless connectivity and fast speeds.",
  },
  {
    id: 9,
    simNumber: "9012-3456-7890-1234",
    price: "$129.99",
    validity: "270 days",
    description: "Stay connected with our premium SIM card. Enjoy fast speeds, reliable coverage, and great benefits.",
  },
  {
    id: 10,
    simNumber: "0123-4567-8901-2345",
    price: "$139.99",
    validity: "300 days",
    description: "Upgrade to our premium SIM card and enjoy the best network coverage and lightning-fast speeds.",
  },
];
  return (
    <Container sx={{mt: 15, mb: 10}} maxWidth="md">
      <div>
        <SortSelect/>
        <SortSelect/>
        <SignInBtn/>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 15}}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          simNumber={product.simNumber}
          price={product.price}
          validity={product.validity}
          description={product.description}
        />
      ))}
      </div>
      <div>
        <BasicPagination/>
      </div>
    </Container>
  );
}
