import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { Box, Container, Typography, Grid, Alert } from "@mui/material";
import PizzaBlock from "../components/PizzaBlock";
import MyLoader from "../components/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/filter/filterSlice";
import { RootState } from "../redux/store";
import axios from "axios";

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
  const { category, sort, searchTerm } = useSelector((state: RootState) => ({
    category: state.filter.category,
    sort: state.filter.sort.sortProperty,
    searchTerm: state.filter.searchTerm,
  }));

  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPizzas = async () => {
      setLoading(true);
      setError(null);

      try {
        const isDescending = sort.startsWith("-");
        const sortBy = sort.replace("-", "");
        const order = isDescending ? "desc" : "asc";

        const params = new URLSearchParams();
        if (category > 0) params.append("category", String(category));
        params.append("sortBy", sortBy);
        params.append("order", order);
        if (searchTerm) params.append("search", searchTerm);

        const url = `https://66dc505a47d749b72acb471f.mockapi.io/pizzas?${params.toString()}`;

        const { data } = await axios.get<Pizza[]>(url, { signal: controller.signal });
        setPizzas(data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError("Failed to load pizzas. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
    window.scrollTo(0, 0);

    return () => controller.abort();
  }, [category, sort, searchTerm]);

  const onChangeCategory = (id: number) => dispatch(setCategory(id));

  return (
    <Container maxWidth="lg">
      {/* Filters Section */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="space-between"
        alignItems="center"
        mt={3}
        mb={4}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
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
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {loading
            ? [...Array(10)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <MyLoader />
                </Grid>
              ))
            : pizzas.map((pizza) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pizza.id}>
                  <PizzaBlock {...pizza} id={String(pizza.id)}/>
                </Grid>
              ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
