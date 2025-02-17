import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Typography, CircularProgress, Box } from "@mui/material";
import BookList from "../components/BookList";

const SearchResults: React.FC = () => {
  const { searchResults, loading, error } = useSelector(
    (state: RootState) => state.books
  );

  useEffect(() => {
    window.scrollTo({ top: 650, behavior: "smooth" });
  }, []);

  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Search Results
      </Typography>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      )}

      {/* Book List */}
      {!loading && !error && searchResults.length > 0 ? (
        <BookList books={searchResults.slice(0, 16)} />
      ) : (
        !loading &&
        !error && (
          <Typography variant="h6" color="textSecondary">
            No results found.
          </Typography>
        )
      )}
    </Box>
  );
};

export default SearchResults;
