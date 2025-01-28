import { useContext } from "react";
import Header from "../Components/Header";
import { AppContext } from "../Context/AppContext";
import { Navigate } from "react-router";

export default function AuthenticatedLayout({ children }) {
  const { token } = useContext(AppContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
