import React from "react";
import { TextField, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search submitted!");
  };

  return (
    <Box
      component="section"
      sx={{ display: "flex", justifyContent: "center", p: 2 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
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
