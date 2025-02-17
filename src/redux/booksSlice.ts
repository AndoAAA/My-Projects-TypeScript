import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://openlibrary.org";

interface BookResponse {
  works: {
    authors: { name: string[] }[];
    title: string;
    key: string;
    cover_id?: number;
  }[];
}

interface SearchResult {
  title: string;
  author_name: string[];
  key: string;
  cover_i: number;
}

interface BookDetails {
  title: string;
  subjects: string[];
  description: string | { value: string };
  key: string;
  covers?: number[];
}

interface BookState {
  booksByCategory: { [category: string]: BookResponse["works"] };
  searchResults: SearchResult[];
  bookDetails: BookDetails | null;
  loading: boolean;
  error: string | null;
}

export const fetchBooksCategory = createAsyncThunk(
  "books/fetchBooksCategory",
  async (category: string) => {
    const response = await axios.get<BookResponse>(
      `${BASE_URL}/subjects/${category.toLowerCase()}.json?limit=4`
    );
    return { category, books: response.data.works };
  }
);

export const fetchSearchResults = createAsyncThunk(
  "books/fetchSearchResults",
  async (query: string) => {
    const response = await axios.get<{ docs: SearchResult[] }>(
      `${BASE_URL}/search.json?q=${query}`
    );
    return response.data.docs.map((doc) => ({
      title: doc.title,
      author_name: doc.author_name || [],
      key: doc.key,
      cover_i: doc.cover_i,
    }));
  }
);

export const fetchBooksDetails = createAsyncThunk<BookDetails, string>(
  "books/fetchBooksDetails",
  async (bookId: string) => {
    const response = await axios.get<BookDetails>(
      `${BASE_URL}/works/${bookId}.json`
    );
    return response.data;
  }
);

const initialState: BookState = {
  booksByCategory: {},
  searchResults: [],
  bookDetails: null,
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBooksCategory.fulfilled,
        (
          state,
          action: PayloadAction<{
            category: string;
            books: BookResponse["works"];
          }>
        ) => {
          state.loading = false;
          state.booksByCategory[action.payload.category] = action.payload.books;
        }
      )
      .addCase(fetchBooksCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch books";
      })
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSearchResults.fulfilled,
        (state, action: PayloadAction<SearchResult[]>) => {
          state.loading = false;
          state.searchResults = action.payload;
        }
      )
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      })
      .addCase(fetchBooksDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBooksDetails.fulfilled,
        (state, action: PayloadAction<BookDetails>) => {
          state.loading = false;
          state.bookDetails = action.payload;
        }
      )
      .addCase(fetchBooksDetails.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default booksSlice.reducer;
