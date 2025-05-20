import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";

const protectedRoute = ({ children }) => {
	let auth = localStorage.getItem("token");
	if (!auth) {
		return <Navigate to="/login" />;
	}
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
