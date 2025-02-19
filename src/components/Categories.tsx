import React from "react";
import { Box, Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchSearchResults } from "../redux/booksSlice";
import { useNavigate } from "react-router-dom";

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

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const chooseCategory = (category: string) => {
    dispatch(fetchSearchResults(category));
    navigate(`/search?category=${encodeURIComponent(category)}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 2,
        p: { xs: 3, md: 5 },
      }}
    >
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          clickable
          onClick={() => chooseCategory(category)}
          sx={{
            backgroundColor: "#6f4f37",
            color: "#fff",
            fontSize: "16px",
            padding: "12px",
            borderRadius: "12px",
            transition: "all 0.3s ease-in-out",
            fontWeight: "bold",
            "&:hover, &:focus": {
              backgroundColor: "#5a3e26",
              transform: "scale(1.1)",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            },
            "&:active": {
              transform: "scale(1.05)",
            },
            cursor: "pointer",
          }}
        />
      ))}
    </Box>
  );
};

export default Categories;
