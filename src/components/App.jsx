import "./App.css";
import ContactForm from "./ContactFormFile/ContactForm";
import SearchBox from "./SearchBoxFile/SearchBox";
import ContactList from "./ContactListFile/ContactList";

function App() {
  return (
    <div className="wrap">
      <h1>Książka adresowa</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

export default App;
