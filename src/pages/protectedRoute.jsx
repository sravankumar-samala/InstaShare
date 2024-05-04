import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ Component }) {
  const token = Cookies.get("jwt_token");
  if (!token) return <Navigate to="/login" />;

  return <Component />;
}
