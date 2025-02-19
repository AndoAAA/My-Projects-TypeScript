import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBooksDetails } from "../redux/booksSlice";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Book: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const bookDetails = useSelector(
    (state: RootState) => state.books.bookDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchBooksDetails(id));
    }
  }, [dispatch, id]);

  if (!bookDetails) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box p={4} display="flex" flexDirection="column" alignItems="center">
      <Button
        onClick={() => navigate("/")}
        startIcon={<KeyboardBackspaceIcon />}
        variant="contained"
        sx={{
          mb: 3,
          textTransform: "none",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "#6f4f37",
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "#5a3e26",
          },
        }}
      >
        Go Back
      </Button>

      <Paper
        elevation={6}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          maxWidth: 900,
          width: "100%",
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        {bookDetails?.covers && bookDetails.covers.length > 0 && (
          <Box
            component="img"
            src={`https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}-M.jpg`}
            alt={bookDetails.title}
            width={220}
            height={320}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        )}

        <Box flex={1}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#333" }}
          >
            {bookDetails?.title || "Unknown Title"}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            sx={{ fontStyle: "italic" }}
          >
            {bookDetails?.subjects?.length
              ? bookDetails.subjects.join(", ")
              : "No subjects available"}
          </Typography>
          <Typography
            variant="body1"
            mt={3}
            sx={{ fontSize: "18px", lineHeight: 1.6, color: "#555" }}
          >
            {typeof bookDetails?.description === "object"
              ? bookDetails?.description?.value
              : bookDetails?.description || "No description available."}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Book;
