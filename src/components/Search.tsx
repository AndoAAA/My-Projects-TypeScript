import { InputAdornment, TextField } from "@mui/material";
import React, { useContext } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { SearchContext } from "./SearchContext";

const Search: React.FC = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      placeholder="Search pizzas..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon color="action" />
          </InputAdornment>
        ),
        endAdornment: searchTerm && (
          <InputAdornment position="end">
            <ClearIcon
              onClick={() => setSearchTerm("")}
              sx={{
                cursor: "pointer",
                color: "action.active",
                marginRight: "8px",
              }}
            />
          </InputAdornment>
        ),
      }}
      aria-label="Search for pizzas"
    />
  );
};

export default Search;
