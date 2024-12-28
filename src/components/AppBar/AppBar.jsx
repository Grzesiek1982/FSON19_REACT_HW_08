import styles from "./AppBar.module.css";
import { useSelector } from "react-redux";
import { selectUser, selectUserIsLoggedIn } from "../../redux/auth/selectors";
import { Navigation } from "../Navigation/Navigation";
import { UserMenu } from "../UserMenu/UserMenu";
import { AuthNav } from "../AuthNav/AuthNav";

const AppBar = () => {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <header className={styles.header}>
      <h3>Książka telefoniczna</h3>
      {isLoggedIn && <div>{user.email}</div>}
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
