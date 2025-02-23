import { Box, Typography } from "@mui/material";
import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Box
        display="flex"
        gap={2}
        p={1}
        sx={{ borderRadius: "30px", bgcolor: "#f5f5f5" }}
      >
        {categories.map((category, i) => (
          <Typography
            key={i}
            variant="body1"
            onClick={() => onChangeCategory(i)}
            sx={{
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "20px",
              bgcolor: value === i ? "orange" : "transparent",
              color: value === i ? "white" : "black",
              transition: "0.3s",
              "&:hover": { bgcolor: "orange", color: "white" },
            }}
          >
            {category}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Categories;
