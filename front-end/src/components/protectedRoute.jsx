import { Navigate } from "react-router-dom"

const protectedRoute = ({ children }) => {
  let auth = localStorage.getItem('token')
  return auth ? children : <Navigate to="/login" />
}

export default protectedRoute
