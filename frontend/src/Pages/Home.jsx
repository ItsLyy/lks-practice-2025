import { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";

export default function Home() {
  const { user } = useContext(AppContext);
  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <p>Welcome, {user.username || "Reader"}!</p>
        </div>
      </div>
    </section>
  );
}
