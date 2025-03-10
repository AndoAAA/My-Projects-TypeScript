import { InputAdornment, TextField } from "@mui/material";
import React, { useRef, useState, useCallback, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setSearchTerm } from "../redux/filter/filterSlice";

const Search: React.FC = () => {
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(searchTerm);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const debounceSearch = useCallback((value: string) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      dispatch(setSearchTerm(value));
    }, 500);
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debounceSearch(value);
  };

  const clearSearch = () => {
    setInputValue("");
    dispatch(setSearchTerm(""));
    inputRef.current?.focus();
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      placeholder="Search pizzas..."
      value={inputValue}
      onChange={handleInputChange}
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon color="action" />
          </InputAdornment>
        ),
        endAdornment: inputValue && (
          <InputAdornment position="end">
            <ClearIcon
              onClick={clearSearch}
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
