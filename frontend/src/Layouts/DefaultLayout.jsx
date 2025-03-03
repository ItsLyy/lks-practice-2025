import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router";
import axiosClient from "../axios/axios-client";
import { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";

export default function DefaultLayout() {
  const { token, setToken, user } = useContext(AppContext);
  const navigate = useNavigate();

  if (user.role === "jurnalis") {
    return <Navigate to="/journalist" />;
  }

  const onLogoutHandler = () => {
    if (confirm("Are you sure?")) {
      axiosClient.post("/logout").then(() => {
        setToken("");
        navigate("/login");
      });
    }
  };

  return (
    <>
      <header>
        <nav>
          <div className="container">
            <ul className="nav__menu">
              <li className="nav__item">
                <NavLink
                  className={({ isActive }) =>
                    `nav__link active${isActive && " ` nav__link"}`
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  className={({ isActive }) =>
                    `nav__link active${isActive && " ` nav__link"}`
                  }
                  to="/news"
                >
                  News
                </NavLink>
              </li>
            </ul>
            {token ? (
              <button className="logout__btn" onClick={onLogoutHandler}>
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn__primary">
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
