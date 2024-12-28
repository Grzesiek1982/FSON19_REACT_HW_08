import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  contact: null,
  onConfirm: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      console.log(action.payload, "ACTION");
      state.isOpen = true;
      state.contact = action.payload;
      state.onConfirm = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.contact = initialState.contact;
      state.onConfirm = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
