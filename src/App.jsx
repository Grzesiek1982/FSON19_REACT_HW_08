import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";

import ContactForm from "./components/ContactFormFile/ContactForm.jsx";
import ContactList from "./components/ContactListFile/ContactList.jsx";
import SearchBox from "./components/SearchBoxFile/SearchBox.jsx";

import contactsData from "./data/contactsData.json";

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : contactsData;
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  return (
    <>
      <div>
        <h1>Książka adresowa</h1>
        <ContactForm onAddContact={addContact} />
        <SearchBox value={filter} onChange={setFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    </>
  );
}

export default App;
