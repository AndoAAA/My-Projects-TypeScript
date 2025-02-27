import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { Box, Container, Typography, Grid } from "@mui/material";
import PizzaBlock from "../components/PizzaBlock";
import MyLoader from "../components/Skeleton";

const Home: React.FC = () => {
  const [category, setCategory] = useState(0);
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://66dc505a47d749b72acb471f.mockapi.io/pizzas`)
      .then((res) => res.json())
      .then((arr) => {
        console.log("Fetched Pizzas:", arr);
        setPizzas(arr);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pizzas:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      {/* Filters Section */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap="20px"
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
          {loading
            ? [...Array(10)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <MyLoader />
                </Grid>
              ))
            : pizzas.map((pizza, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <PizzaBlock
                    name={pizza.name}
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
