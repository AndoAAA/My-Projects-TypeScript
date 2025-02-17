import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBooksDetails } from "../redux/booksSlice";
import { Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Book: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const bookDetails = useSelector(
    (state: RootState) => state.books.bookDetails
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchBooksDetails(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Box>
        <button onClick={() => navigate("/")}>
          KeyboardBackspaceIcon <span>Go Back</span>
        </button>
        <Box>
            <Box>
                {bookDetails?.covers && bookDetails.covers.length > 0 }
            </Box>
        </Box>
      </Box>
    </>
  );
};

export default Book;
