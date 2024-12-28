import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../../components/ContactFormFile/ContactForm";
import ContactList from "../../components/ContactListFile/ContactList";
import SearchBox from "../../components/SearchBoxFile/SearchBox";
import styles from "./ContactsPage.module.css";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import Modal from "../../components/Modal/Modal";
import { selectModalState } from "../../redux/modal/selectors";
import { Toaster } from "react-hot-toast";
import EditForm from "../../components/EditForm/EditForm";
import { selectEditState } from "../../redux/contacts/selectors";

const ContactsPage = () => {
  const { isOpen, contact } = useSelector(selectModalState);
  const { editIsOpen, editContact } = useSelector(selectEditState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className={styles.wrap}>
      <h1>Książka telefoniczna</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
      {editIsOpen && <EditForm editContact={editContact} />}
      {isOpen && <Modal contact={contact} />}
      <Toaster />
    </div>
  );
};

export default ContactsPage;
