import React, { useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { Container } from "@mui/material";

const Home: React.FC = () => {
  const [category, setCategory] = useState(0);

  return (
    <Container 
      sx={{
        display: "flex", 
        justifyContent: "space-around", 
        alignItems: "center", 
        gap: 3,
        maxWidth: "lg",
        mt: 3
      }}
    >
      <Categories value={category} onChangeCategory={setCategory} />
      <Sort />
    </Container>
  );
};

export default Home;
