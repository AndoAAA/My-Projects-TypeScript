import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { Box, Container, Typography, Grid, Alert } from "@mui/material";
import PizzaBlock from "../components/PizzaBlock";
import MyLoader from "../components/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/filter/filterSlice";
import { RootState } from "../redux/store";

interface Pizza {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
  rating: number;
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.filter.category);
  const sort = useSelector((state: RootState) => state.filter.sort.sortProperty);
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      setLoading(true);
      setError(null);

      try {
        const isDescending = !sort.startsWith("-");
        const sortBy = sort.replace("-", "");
        const order = isDescending ? "desc" : "asc";

        const params = new URLSearchParams();
        if (category > 0) params.append("category", String(category));
        params.append("sortBy", sortBy);
        params.append("order", order);
        if (searchTerm) params.append("search", searchTerm);

        const url = `https://66dc505a47d749b72acb471f.mockapi.io/pizzas?${params.toString()}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch pizzas");
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
        setError("Sorry, we couldn't load the pizzas. Please try again later.");
        setPizzas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
    window.scrollTo(0, 0);
  }, [category, sort, searchTerm]);

  const onChangeCategory = (id: number) => {
    dispatch(setCategory(id));
  };

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
        <Categories value={category} onChangeCategory={onChangeCategory} />
        <Sort />
      </Box>

      {/* Pizza Listing */}
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          All Pizzas
        </Typography>
        
        {/* Error Handling */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {loading
            ? [...Array(10)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <MyLoader />
                </Grid>
              ))
            : pizzas.map((pizza) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pizza.id}>
                  <PizzaBlock
                    id={String(pizza.id)}
                    name={pizza.name}
                    imageUrl={pizza.imageUrl}
                    price={pizza.price}
                    sizes={pizza.sizes}
                    types={pizza.types}
                    rating={pizza.rating}
                  />
                </Grid>
              ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
