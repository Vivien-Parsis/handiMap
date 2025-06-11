import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const protectedOwnerRoute = ({ children }) => {
	let auth = localStorage.getItem("token");
	if (!auth) {
		return <Navigate to="/login" />;
	}
	const decode = jwtDecode(auth);
	if (decode) {
		if (!decode.role || !decode.id_user || !decode.email) {
			localStorage.removeItem("token");
			return <Navigate to="/login" />;
		} else if (decode.role === "owner" || decode.role === "admin") {
			return children;
		} else {
			return <Navigate to="/" />;
		}
	}
};

export default protectedOwnerRoute;
