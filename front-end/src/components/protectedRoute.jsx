import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const protectedRoute = ({ children }) => {
  let auth = localStorage.getItem("token");
  const decode = jwtDecode(auth);
  return decode ? children : <Navigate to="/login" />;
};

export default protectedRoute;
