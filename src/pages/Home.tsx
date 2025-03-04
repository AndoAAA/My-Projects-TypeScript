import React, { useContext, useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { Box, Container, Typography, Grid } from "@mui/material";
import PizzaBlock from "../components/PizzaBlock";
import MyLoader from "../components/Skeleton";
import { SearchContext } from "../components/SearchContext";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
  const sort = useSelector(
    (state: RootState) => state.filter.sort.sortProperty
  );
  const { searchTerm } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const isDescending = !sort.startsWith("-");
    const sortBy = sort.replace("-", "");
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
  }, [category, sort]);

  const filteredPizzas = pizzas.filter((pizza) =>
    pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
