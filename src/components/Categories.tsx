import React from "react";
import { Box, Chip } from "@mui/material";

const Categories: React.FC = () => {
  const categories = [
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Mystery",
    "Biography",
    "History",
    "Technology",
    "Arts",
    "Literature",
    "Philosophy",
    "Health",
    "Religion",
    "Law",
    "Cooking",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 3,
        p: 5,
      }}
    >
      {categories.map((category, index) => (
        <Chip
          key={index}
          label={category}
          clickable
          sx={{
            width: "200px",
            backgroundColor: "#6f4f37",
            padding: "10px",
            borderRadius: "10px",
            color: "#fff",
            fontSize: "18px",
            transition: "0.3s",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "#5a3e26",
            },
            cursor: "pointer",
          }}
        />
      ))}
    </Box>
  );
};

export default Categories;
