import React from "react";
import StatsSection from "../components/Stats";
import { Box } from "@mui/material";

const Home: React.FC = () => {
  return (
    <>
      <Box sx={{padding:"50px"}}>
        <StatsSection />
      </Box>
    </>
  );
};

export default Home;
