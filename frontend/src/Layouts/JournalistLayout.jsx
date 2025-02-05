import { useContext } from "react";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router";
import { AppContext } from "../Contexts/AppContext";
import axiosClient from "../axios/axios-client";

export default function JournalistLayout() {
  const { token, setToken, user } = useContext(AppContext);
  const navigate = useNavigate();

  if (user.role === "pembaca") {
    return <Navigate to="/" />;
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
                  to="/journalist"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  className={({ isActive }) =>
                    `nav__link active${isActive && " ` nav__link"}`
                  }
                  to="/journalist/news"
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
