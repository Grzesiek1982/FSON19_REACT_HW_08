import { useSelector } from "react-redux";
import { selectUserIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
