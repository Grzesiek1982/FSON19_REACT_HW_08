import { Field, Form, Formik } from "formik";
import styles from "./LoginForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { selectUserIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
const LoginForm = () => {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const dispatch = useDispatch();
  const handleSubmit = (values, options) => {
    dispatch(login(values));
    options.resetForm();
  };

  const initialValues = {
    email: "",
    password: "",
  };

  if (isLoggedIn) {
    return <Navigate to="/contacts" />;
  }

  return (
    <div className={styles.wrapper}>
      <h2>Zaloguj się</h2>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className={styles.form}>
          <Field name="email" placeholder="Wpisz e-mail" />
          <Field name="password" type="password" placeholder="Wpisz hasło" />
          <button type="submit">Zaloguj</button>
        </Form>
      </Formik>
    </div>
  );
};
export default LoginForm;
