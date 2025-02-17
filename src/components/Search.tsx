import React, { useState } from "react";
import { TextField, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchSearchResults } from "../redux/booksSlice";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchSearchResults(query));
      navigate("/search");
      setQuery("");
    }
  };

  return (
    <Box
      component="section"
      sx={{ display: "flex", justifyContent: "center", p: 2 }}
    >
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderRadius: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search for books..."
          aria-label="Search books"
          size="small"
          sx={{
            flexGrow: 1,
            "& fieldset": { border: "none" },
            "& input": { padding: "10px 12px" },
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton
          type="submit"
          color="primary"
          aria-label="Search"
          sx={{
            fontSize: "18px",
            padding: "12px 20px",
            backgroundColor: "#6f4f37",
            borderRadius: "0 10px 10px 0",
            color: "#fff",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#5a3e26",
            },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Search;
