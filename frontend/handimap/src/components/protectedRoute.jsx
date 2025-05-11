import { Navigate, Outlet } from "react-router-dom"
const protectedRoute = () => {
  let auth = localStorage.getItem('token')
  return auth.token ? <Outlet /> : <Navigate to="/login" />
}

export default protectedRoute
