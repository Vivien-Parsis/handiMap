import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const protectedRoute = ({ children }) => {
  let auth = localStorage.getItem("token");
  const decoded = jwtDecode(auth);
  if (!decoded) {
    return <Navigate to="/login" />;
  } else if (!decoded.role || !decoded.email || !decoded.id_user) {
    localStorage.setItem("token", "");
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default protectedRoute;
