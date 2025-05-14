import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const protectedOwnerRoute = ({ children }) => {
  let auth = localStorage.getItem("token");
  const decode = jwtDecode(auth)
  if (decode) {
    if (decode.role === "owner") {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default protectedOwnerRoute;
