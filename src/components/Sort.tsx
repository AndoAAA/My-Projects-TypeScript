import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";

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
  const [selectedSort, setSelectedSort] = useState<string>("");

  const handleSortSelect = (sortProperty: string) => {
    setSelectedSort(sortProperty);
    console.log("Sorted by:", sortProperty);
  };

  return (
    <div>
      <PopupState variant="popper" popupId="demo-popup-popper">
        {(popupState) => (
          <div>
            <Button
              variant="contained"
              {...bindToggle(popupState)}
              sx={{
                bgcolor: "orange",
                borderRadius: "30px",
                px: 3,
                "&:hover": { bgcolor: "darkorange" },
              }}
            >
              Sort By
            </Button>
            <Popper {...bindPopper(popupState)} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper sx={{ color: "darkorange", cursor: "pointer" }}>
                    {sortList.map((item) => (
                      <Typography
                        key={item.sortProperty}
                        sx={{ p: 2, cursor: "pointer" }}
                        onClick={() => handleSortSelect(item.sortProperty)}
                      >
                        {item.name}
                      </Typography>
                    ))}
                  </Paper>
                </Fade>
              )}
            </Popper>
          </div>
        )}
      </PopupState>
    </div>
  );
};

export default Sort;
