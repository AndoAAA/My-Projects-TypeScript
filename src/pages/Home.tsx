import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { Box, Container, Typography, Grid } from "@mui/material";
import PizzaBlock from "../components/PizzaBlock";
import MyLoader from "../components/Skeleton";

interface Pizza {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

interface HomeProps {
  searchTerm: string;
}

const Home: React.FC<HomeProps> = ({ searchTerm }) => {
  const [category, setCategory] = useState(0);
  const [sortType, setSortType] = useState("rating");
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const isDescending = !sortType.startsWith("-");
    const sortBy = sortType.replace("-", "");
    const order = isDescending ? "desc" : "asc";

    const categoryFilter = category > 0 ? `category=${category}` : "";
    const sortQuery = `sortBy=${sortBy}&order=${order}`;

    const url = `https://66dc505a47d749b72acb471f.mockapi.io/pizzas?${
      categoryFilter ? `${categoryFilter}&` : ""
    }${sortQuery}`;

    fetch(url)
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

    window.scrollTo(0, 0);
  }, [category, sortType]);

  const filteredPizzas = pizzas.filter((pizza) =>
    pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Sort value={sortType} onChangeSort={setSortType} />
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
            : filteredPizzas.map((pizza) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pizza.id}>
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
