import { useDispatch, useSelector } from "react-redux";
import { editingContact } from "../../redux/contacts/operations";
import styles from "./EditForm.module.css";
import toast from "react-hot-toast";
import { selectEditState } from "../../redux/contacts/selectors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import { closeEditModal } from "../../redux/contacts/slice";

const FeedBackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Wpisałeś za mało znaków")
    .max(50, "Wpisałeś za dużo znaków")
    .transform((value) => {
      return value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    })
    .required("Pole obawiązkowe"),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{2}-\d{2}$/,
      "Numer telefonu musi być w formacie: 111-11-11"
    )
    .required("Pole obawiązkowe"),
});

const EditForm = () => {
  const { editIsOpen, editContact } = useSelector(selectEditState);
  const dispatch = useDispatch();
  const notify = () => toast("Kontakt został zmieniony");

  const initialValues = {
    name: editContact.name,
    number: editContact.number,
  };

  if (!editIsOpen) return null;

  const handleEditContact = async (values) => {
    try {
      const updatedContact = {
        id: editContact.id,
        name: values.name,
        number: values.number,
      };

      await dispatch(editingContact(updatedContact)).unwrap();
      dispatch(closeEditModal());
      notify();
    } catch (error) {
      console.error("Błąd podczas edytowania kontaktu:", error);
    }
  };

  return (
    <div>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.formWraper}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleEditContact}
              validationSchema={FeedBackSchema}
            >
              {({ setFieldValue }) => (
                <Form className={styles.forma}>
                  <label className={styles.labelForma} htmlFor="name">
                    Wpisz imię i nazwisko
                  </label>
                  <Field
                    className={styles.inputForma}
                    type="text"
                    name="name"
                    onChange={(e) => {
                      const value = e.target.value
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ");
                      setFieldValue("name", value);
                    }}
                    placeholder={editContact.name}
                  />
                  <ErrorMessage
                    className={styles.validationMessage}
                    name="name"
                    component="span"
                  />
                  <label className={styles.labelForma} htmlFor="number">
                    Wpisz numer telefonu
                  </label>
                  <Field name="number">
                    {({ field }) => (
                      <MaskedInput
                        {...field}
                        mask={[
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                        ]}
                        placeholder={editContact.number}
                        className={styles.inputForma}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    className={styles.validationMessage}
                    name="number"
                    component="span"
                  />
                  <div className={styles.buttons}>
                    <button className={styles.buttonFormGreen} type="submit">
                      Edytuj kontakt
                    </button>
                    <button
                      className={styles.buttonForm}
                      onClick={() => dispatch(closeEditModal())}
                    >
                      Zrezygnuj
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
