import styles from "./Contact.module.css";
import { ImPhone } from "react-icons/im";
import { RiContactsFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.contact}>
      <div>
        <p>
          <RiContactsFill className={styles.ico} />
          {contact.name}
        </p>
        <p>
          <ImPhone className={styles.ico} />
          {contact.number}
        </p>
      </div>
      <button
        className={styles.deleteBtn}
        onClick={() => dispatch(deleteContact(contact.id))}
      >
        Usuń
      </button>
    </div>
  );
};

export default Contact;
