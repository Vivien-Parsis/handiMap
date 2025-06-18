import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

const ProtectedOwnerRoute = ({ children }) => {
  let auth = localStorage.getItem("token");
  if (!auth) {
    return <Navigate to="/login" />;
  }
  try {
    const decode = jwtDecode(auth);
    if (decode) {
      if (!decode.role || !decode.id_user || !decode.email) {
        alert("format jwt incorect");
        localStorage.removeItem("token");
        return <Navigate to="/login" />;
      } else if (decode.role === "owner" || decode.role === "admin") {
        return children;
      } else {
        alert("vous êtes pas autorisé a acceder a cette page");
        return <Navigate to="/" />;
      }
    }
  } catch (err) {
    console.log(err);
    alert("token jwt invalide");
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

ProtectedOwnerRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedOwnerRoute;
