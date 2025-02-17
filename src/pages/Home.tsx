import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBooksCategory } from "../redux/booksSlice";
import { Box, Typography, CircularProgress } from "@mui/material";
import BookList from "../components/BookList";

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const booksByCategory = useSelector(
    (state: RootState) => state.books.booksByCategory
  );
  const loading = useSelector((state: RootState) => state.books.loading);

  useEffect(() => {
    const categories = ["Fiction", "Mystery", "Romance", "Fantasy"];
    categories.forEach((category) => {
      if (!booksByCategory[category]) {
        dispatch(fetchBooksCategory(category));
      }
    });
  }, [dispatch, booksByCategory]);

  return (
    <Box sx={{ p: 2 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        Object.keys(booksByCategory).map((category, categoryIndex) => {
          const books = booksByCategory[category];
          return (
            <Box key={categoryIndex} sx={{ mb: 4 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {category}
              </Typography>
              {books.length > 0 ? (
                <BookList books={books.slice(0, 4)} />
              ) : (
                <Box>No books available</Box>
              )}
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default Home;
