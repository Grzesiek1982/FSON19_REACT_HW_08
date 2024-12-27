import "./App.css";
import ContactForm from "./ContactFormFile/ContactForm";
import SearchBox from "./SearchBoxFile/SearchBox";
import ContactList from "./ContactListFile/ContactList";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../redux/contactsOps";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Książka adresowa</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

export default App;
