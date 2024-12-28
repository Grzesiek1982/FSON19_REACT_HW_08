import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editingContact,
} from "./operations";
import { logout } from "../auth/operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
  editIsOpen: false,
  editContact: null,
  editOnConfirm: null,
};

console.log("InitialState in contactSlice:", initialState);

const slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    openEditModal: (state, action) => {
      console.log(action.payload, "EDIT ACTION");
      state.editIsOpen = true;
      state.editContact = action.payload;
      state.editOnConfirm = true;
    },
    closeEditModal: (state) => {
      state.editIsOpen = false;
      state.editContact = initialState.contact;
      state.editOnConfirm = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        console.log("ID to delete:", payload);
        state.items = state.items.filter((item) => item.id !== payload);
      })
      .addCase(editingContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(logout.fulfilled, () => initialState)
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending
        ),
        (state) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected
        ),
        (state) => {
          state.loading = false;
          state.error = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          addContact.fulfilled,
          deleteContact.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const contactsReducer = slice.reducer;
export const { openEditModal, closeEditModal } = slice.actions;
