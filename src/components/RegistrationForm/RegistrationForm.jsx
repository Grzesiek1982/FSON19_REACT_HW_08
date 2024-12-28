import { Field, Form, Formik } from "formik";
import styles from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
const RegisterForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, options) => {
    dispatch(register(values));
    options.resetForm();
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  return (
    <div className={styles.wrapper}>
      <h2>Rejestracja</h2>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className={styles.form}>
          <Field name="name" placeholder="Wpisz imię" />
          <Field name="email" placeholder="Wpisz e-mail" />
          <Field name="password" type="password" placeholder="Wpisz hasło" />
          <button type="submit">Zarejestruj</button>
        </Form>
      </Formik>
    </div>
  );
};
export default RegisterForm;
