import styles from "./Contact.module.css";
import { ImPhone } from "react-icons/im";
import { RiContactsFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modal/modalSlice";
import { CiEdit } from "react-icons/ci";
import { openEditModal } from "../../redux/contacts/slice";
import { MdOutlineDeleteForever } from "react-icons/md";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal(contact));
  };

  const editHandleClick = () => {
    dispatch(openEditModal(contact));
  };

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
      <div>
        <button className={styles.deleteBtn} onClick={editHandleClick}>
          <CiEdit />
        </button>

        <button className={styles.deleteBtn} onClick={handleClick}>
          <MdOutlineDeleteForever />
        </button>
      </div>
    </div>
  );
};

export default Contact;
