import React, { useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { Box, Container, Typography, Grid } from "@mui/material";
import PizzaBlock from "../components/PizzaBlock";

const Home: React.FC = () => {
  const [category, setCategory] = useState(0);

  const pizzas = [
    {
      title: "Pepperoni Pizza",
      imageUrl: "https://example.com/pepperoni.jpg",
      price: 12.99,
    },
    {
      title: "Margherita",
      imageUrl: "https://example.com/margherita.jpg",
      price: 10.99,
    },
    {
      title: "BBQ Chicken",
      imageUrl: "https://example.com/bbq.jpg",
      price: 13.99,
    },
    {
      title: "Vegetarian",
      imageUrl: "https://example.com/veggie.jpg",
      price: 11.49,
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Filters Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
        mb={4}
      >
        <Categories value={category} onChangeCategory={setCategory} />
        <Sort />
      </Box>

      {/* Pizza Listing */}
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          All Pizzas
        </Typography>
        <Grid container spacing={3}>
          {pizzas.map((pizza, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <PizzaBlock
                title={pizza.title}
                imageUrl={pizza.imageUrl}
                price={pizza.price}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
