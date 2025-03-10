import { Box, Button } from "@mui/material";
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
        flexWrap="wrap"
        gap={{ xs: 1, sm: 2 }}
        p={1}
        sx={{
          borderRadius: "30px",
          bgcolor: "#ffff",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
        }}
      >
        {categories.map((category, i) => (
          <Button
            key={i}
            variant={value === i ? "contained" : "outlined"}
            onClick={() => onChangeCategory(i)}
            aria-pressed={value === i}
            aria-label={`Category: ${category}`}
            sx={{
              borderRadius: "20px",
              bgcolor: value === i ? "orange" : "transparent",
              color: value === i ? "white" : "black",
              border: value === i ? "none" : "1px solid #ccc",
              transition: "all 0.3s ease",
              fontSize: { xs: "12px", sm: "14px" },
              padding: { xs: "6px 10px", sm: "8px 16px" },
              minWidth: { xs: "100%", sm: "auto" },
              "&:hover": { bgcolor: "orange", color: "white" },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Categories;
