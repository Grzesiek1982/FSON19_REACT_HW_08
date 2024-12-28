import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    return contacts.filter(
      (item) =>
        item.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
        item.number.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }
);

export const selectEditState = (state) => state.contacts;
