import React, { useEffect } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { Box, Container, Typography, Grid, Alert } from "@mui/material";
import PizzaBlock from "../components/PizzaBlock";
import MyLoader from "../components/Skeleton";
import { RootState, useAppDispatch } from "../redux/store";
import { setCategory } from "../redux/filter/filterSlice";
import { fetchPizzas } from "../redux/pizza/asyncAction";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { category, sort, searchTerm } = useSelector((state: RootState) => ({
    category: state.filter.category,
    sort: state.filter.sort.sortProperty,
    searchTerm: state.filter.searchTerm,
  }));

  const { items: pizzas, status } = useSelector(
    (state: RootState) => state.pizzas
  );

  useEffect(() => {
    dispatch(fetchPizzas({ category, sort, searchTerm }));
    window.scrollTo(0, 0);
  }, [category, sort, searchTerm, dispatch]);

  const onChangeCategory = (id: number) => dispatch(setCategory(id));

  return (
    <Container maxWidth="lg" sx={{ paddingBottom: "50px" }}>
      {/* Filters Section */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="space-between"
        alignItems="center"
        mt={3}
        mb={4}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          paddingLeft: { xs: 2, sm: 0 },
          paddingRight: { xs: 2, sm: 0 },
        }}
      >
        <Categories value={category} onChangeCategory={onChangeCategory} />
        <Sort />
      </Box>

      {/* Pizza Listing */}
      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          All Pizzas
        </Typography>

        {/* Error Handling */}
        {status === "error" && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load pizzas. Please try again later.
          </Alert>
        )}

        <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
          {status === "loading"
            ? [...Array(10)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <MyLoader />
                </Grid>
              ))
            : pizzas.map((pizza) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pizza.id}>
                  <PizzaBlock {...pizza} id={String(pizza.id)} />
                </Grid>
              ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
