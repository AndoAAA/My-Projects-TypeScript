import { Box, Typography, Button, Card, CardContent, CardMedia, Chip } from "@mui/material";
import React from "react";

interface Book {
  title: string;
  author_name?: string[];
  authors?: { name: string[] }[];
  key: string;
  cover_id?: number;
  cover_i?: number;
  subjects?: string[];
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 2,
        p: 2,
        transition: "all 0.3s ease-in-out",
      }}
    >
      {books.length > 0 ? (
        books.map((book, bookIndex) => (
          <Card
            key={bookIndex}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent:"space-between",
              textAlign:"center",
              boxShadow: 3,
              borderRadius: 2,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            {/* Book Cover */}
            <CardMedia
              component="img"
              image={
                book.cover_id
                  ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                  : book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : ""
              }
              alt={book.title}
              sx={{
                height: 300,
                backgroundColor: "#e0e0e0",
                objectFit: "cover",
                borderRadius: "4px 4px 0 0",
                display: "block",
                width: "100%",
              }}
            />

            {/* Card Content */}
            <CardContent sx={{ padding: 2 }}>
              {/* Book Title */}
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {book.title}
              </Typography>

              {/* Book Author */}
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {book.authors ? book.authors[0]?.name : book.author_name?.[0] || "Unknown Author"}
              </Typography>

              {/* Book Subjects (Categories) */}
              <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
                {book.subjects?.map((subject, index) => (
                  <Chip
                    key={index}
                    label={subject}
                    variant="outlined"
                    color="primary"
                    sx={{
                      fontSize: "0.8rem",
                      borderRadius: 1,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#1976d2",
                        color: "#fff",
                      },
                    }}
                  />
                ))}
              </Box>

              {/* View Details Button */}
              <Button
                variant="contained"
                size="small"
                color="primary"
                sx={{
                  display: "inline-block",
                  backgroundColor: "#6f4f37",
                  "&:hover": {
                    backgroundColor: "#5a3e26",
                  },
                  borderRadius: 1,
                  padding: "8px 16px",
                }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Box sx={{ p: 2 }}>
          <Typography>No books available</Typography>
        </Box>
      )}
    </Box>
  );
};

export default BookList;
