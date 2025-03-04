import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setSearchTerm } from "../redux/filter/filterSlice";

const Search: React.FC = () => {
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(searchTerm);

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(e);
      }, delay);
    };
  };


  const searchItems = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    searchItems(e);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      placeholder="Search pizzas..."
      value={inputValue}
      onChange={handleInputChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon color="action" />
          </InputAdornment>
        ),
        endAdornment: inputValue && (
          <InputAdornment position="end">
            <ClearIcon
              onClick={() => {
                setInputValue("");
                dispatch(setSearchTerm(""));
              }}
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
