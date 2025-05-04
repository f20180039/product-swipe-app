import { createSlice } from "@reduxjs/toolkit";
import { I_DATA } from "../utils/types";

interface CardState {
  liked: I_DATA[];
  disliked: I_DATA[];
  saved: I_DATA[];
}

const initialState: CardState = {
  liked: [],
  disliked: [],
  saved: [],
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addLiked: (state, action) => {
      state.liked.push(action.payload);
    },
    addDisliked: (state, action) => {
      state.disliked.push(action.payload);
    },
    addSaved: (state, action) => {
      state.saved.push(action.payload);
    },
    removeLiked: (state, action) => {
      state.liked = state.liked.filter((item) => item.id !== action.payload);
    },
    removeDisliked: (state, action) => {
      state.disliked = state.disliked.filter(
        (item) => item.id !== action.payload
      );
    },
    removeSaved: (state, action) => {
      state.saved = state.saved.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  addLiked,
  addDisliked,
  addSaved,
  removeLiked,
  removeDisliked,
  removeSaved,
} = cardSlice.actions;

export default cardSlice.reducer;
