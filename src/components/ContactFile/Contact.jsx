import styles from "./Contact.module.css";
import { ImPhone } from "react-icons/im";
import { RiContactsFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

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
          {contact.phone}
        </p>
      </div>
      <button
        className={styles.deleteBtn}
        onClick={() => dispatch(deleteContact(contact.id))}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
