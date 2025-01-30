import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import axiosClient from "../api/axios-client";

export default function Header() {
  const { setToken } = useContext(AppContext);

  const onLogoutHandler = (e) => {
    e.preventDefault();

    axiosClient.post("auth/logout").then(() => {
      setToken("");
    });
  };

  return (
    <header className="bg-white shadow-sm shadow-black/10">
      <div className="mx-auto box-border flex justify-between px-2 py-4 md:container">
        <h5 className="text-3xl font-semibold">Formify Inc</h5>

        <button
          className="cursor-pointer text-red-600 transition-colors duration-300 ease-in-out hover:text-red-700"
          onClick={onLogoutHandler}
          type="button"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
