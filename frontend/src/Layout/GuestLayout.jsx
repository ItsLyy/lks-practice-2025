import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Navigate } from "react-router";

export default function GuestLayout({ children }) {
  const { token } = useContext(AppContext);

  if (token) {
    return <Navigate to="/" />;
  }

  return <main>{children}</main>;
}
