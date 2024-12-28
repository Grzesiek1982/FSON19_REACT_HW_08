import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { closeModal } from "../../redux/modal/modalSlice";
import styles from "./Modal.module.css";
import { selectModalState } from "../../redux/modal/selectors";
import toast from "react-hot-toast";

const Modal = () => {
  const { isOpen, contact } = useSelector(selectModalState);
  const dispatch = useDispatch();
  const notify = () => toast("Kontakt usunięty");

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      await dispatch(deleteContact(contact.id)).unwrap();
      dispatch(closeModal());
      notify();
    } catch (error) {
      console.error("Błąd podczas usuwania kontaktu:", error);
    }
  };

  return (
    <div>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2 className={styles.text}>Potwierdzenie</h2>
          <p className={styles.text}>Na pewno chcesz usunać kontakt:</p>
          <p className={styles.boldText}>
            {contact.name} / {contact.number}
          </p>
          <p className={styles.text}>Jesteś pewny?</p>
          <div className={styles.buttons}>
            <button className={styles.buttonGreen} onClick={handleConfirm}>
              Tak
            </button>
            <button
              className={styles.buttonRed}
              onClick={() => dispatch(closeModal())}
            >
              Zrezygnuj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
