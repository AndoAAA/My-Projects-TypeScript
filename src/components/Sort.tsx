import React, { useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

type SortItem = {
  name: string;
  sortProperty: string;
};

const sortList: SortItem[] = [
  { name: "Popular (DESC)", sortProperty: "RATING_DESC" },
  { name: "Popular (ASC)", sortProperty: "RATING_ASC" },
  { name: "Price (DESC)", sortProperty: "PRICE_DESC" },
  { name: "Price (ASC)", sortProperty: "PRICE_ASC" },
  { name: "Alphabet (DESC)", sortProperty: "TITLE_DESC" },
  { name: "Alphabet (ASC)", sortProperty: "TITLE_ASC" },
];

const Sort: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>("Popular (DESC)");
  const sortRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for mobile screen

  return (
    <div ref={sortRef}>
      <PopupState variant="popper" popupId="sort-popup">
        {(popupState) => (
          <ClickAwayListener onClickAway={() => popupState.close()}>
            <div>
              <Button
                variant="contained"
                {...bindToggle(popupState)}
                sx={{
                  bgcolor: "orange",
                  borderRadius: "30px",
                  px: isMobile ? 1.5 : 3, // Adjust padding for mobile
                  py: isMobile ? 1 : 1.5, // Adjust vertical padding for mobile
                  "&:hover": { bgcolor: "darkorange" },
                  minWidth: "150px", // Make the button larger on mobile
                }}
              >
                Sort By: {selectedSort}
              </Button>

              <Popper
                {...bindPopper(popupState)}
                transition
                placement="bottom-start"
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={200}>
                    <Paper
                      sx={{
                        mt: 1,
                        p: isMobile ? 1 : 2, // Adjust padding for mobile
                        borderRadius: "8px",
                        boxShadow: 3,
                        minWidth: "150px", // Set a minimum width for the dropdown
                      }}
                    >
                      {sortList.map((item) => (
                        <Typography
                          key={item.sortProperty}
                          onClick={() => {
                            setSelectedSort(item.name); // Update selected sort
                            popupState.close(); // Close popup after selecting
                          }}
                          sx={{
                            p: 1,
                            cursor: "pointer",
                            borderRadius: "6px",
                            transition: "0.2s",
                            bgcolor:
                              selectedSort === item.name
                                ? "orange"
                                : "transparent",
                            color:
                              selectedSort === item.name ? "white" : "black",
                            "&:hover": { bgcolor: "orange", color: "white" },
                          }}
                        >
                          {item.name}
                        </Typography>
                      ))}
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </div>
          </ClickAwayListener>
        )}
      </PopupState>
    </div>
  );
};

export default Sort;
