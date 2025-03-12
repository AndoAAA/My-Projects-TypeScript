import React, { useRef } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSort } from "../redux/filter/filterSlice";

type SortItem = {
  name: string;
  sortProperty: string;
};

const sortList: SortItem[] = [
  { name: "Popular (Desc)", sortProperty: "rating" },
  { name: "Popular (Asc)", sortProperty: "-rating" },
  { name: "Price (Low to High)", sortProperty: "price" },
  { name: "Price (High to Low)", sortProperty: "-price" },
  { name: "Alphabet (A-Z)", sortProperty: "name" },
  { name: "Alphabet (Z-A)", sortProperty: "-name" },
];

const Sort: React.FC = () => {
  const sort = useSelector((state: RootState) => state.filter.sort);
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const selectedSortName =
    sortList.find((item) => item.sortProperty === sort.sortProperty)?.name ||
    "Popular";

  const onChangeSort = (sortProperty: string) => {
    const selectedSort = sortList.find(
      (item) => item.sortProperty === sortProperty
    );
    if (selectedSort) {
      dispatch(setSort(sortProperty));
    }
  };

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
                  px: isMobile ? 1.5 : 3,
                  py: isMobile ? 1 : 1.5,
                  "&:hover": { bgcolor: "darkorange" },
                  minWidth: "180px",
                }}
              >
                Sort By: {selectedSortName}
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
                        p: isMobile ? 1 : 2,
                        borderRadius: "8px",
                        boxShadow: 3,
                        minWidth: "180px",
                      }}
                    >
                      {sortList.map((item) => (
                        <Typography
                          key={item.sortProperty}
                          onClick={() => {
                            onChangeSort(item.sortProperty);
                            popupState.close();
                          }}
                          sx={{
                            p: 1,
                            cursor: "pointer",
                            borderRadius: "6px",
                            transition: "0.2s",
                            bgcolor:
                              sort.sortProperty === item.sortProperty
                                ? "orange"
                                : "transparent",
                            color:
                              sort.sortProperty === item.sortProperty
                                ? "white"
                                : "black",
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
