import { useSelector } from "react-redux";
import Contact from "../ContactFile/Contact";
import styles from "./ContactList.module.css";
import { selectNameFilter } from "../../redux/filtersSlice";
import { selectContacts } from "../../redux/contactsSlice";

const ContactList = () => {
  const searchValue = useSelector(selectNameFilter);
  const contacts = useSelector(selectContacts);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <ul className={styles.list}>
      {searchValue === ""
        ? contacts.map((contact) => (
            <li key={contact.id}>
              <Contact contact={contact} />
            </li>
          ))
        : filteredContacts.map((contact) => (
            <li key={contact.id}>
              <Contact contact={contact} />
            </li>
          ))}
    </ul>
  );
};

export default ContactList;
