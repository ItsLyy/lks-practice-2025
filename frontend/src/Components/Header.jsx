import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export default function Header() {
  const { setToken } = useContext(AppContext);

  const onLogoutHandler = (e) => {
    e.preventDefault();

    setToken("");
  };

  return (
    <header>
      <h5 className="header__brand">Formify Inc</h5>

      <button className="logout-btn" onClick={onLogoutHandler} type="button">
        Logout
      </button>
    </header>
  );
}
