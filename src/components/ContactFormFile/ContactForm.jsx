import styles from "./ContactForm.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimalna ilość znaków to 3.")
    .max(50, "Maksymalna ilość znaków to 50.")
    .required("Required"),
  number: Yup.string()
    .min(2, "Minimalna ilość znaków to 2.")
    .max(50, "Maksymalna ilość znaków to 50.")
    .required("Wymagane"),
});

const ContactForm = ({ onAddContact }) => {
  const handleSubmit = (values, { resetForm }) => {
    onAddContact(values.name, values.number);
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label className={styles.label}>Wpisz imię</label>
        <Field className={styles.input} type="text" name="name" />
        <ErrorMessage name="name" component="div" className={styles.error} />

        <label className={styles.label}>Wpisz numer telefonu</label>
        <Field className={styles.input} type="tel" name="number" />
        <ErrorMessage name="number" component="div" className={styles.error} />

        <button className={styles.button} type="submit">
          Dodaj kontakt
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
