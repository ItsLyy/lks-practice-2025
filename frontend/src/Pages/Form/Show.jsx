import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import api from "../../api/instance";
import { Link } from "react-router";
import Card from "../../Components/Card";

export default function FormShow() {
  const { token } = useContext(AppContext);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    api
      .get("/forms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setForms(res.data.forms);
      });
  }, [token]);

  return (
    <section id="home">
      <div className="container">
        <header>
          <h1>All Forms</h1>
          <Link to="/add-form">Add Form</Link>
        </header>
        <div className="form__wrapper">
          {forms.map((form, index) => (
            <Card
              key={index}
              title={form.name}
              description={form.description}
              slug={form.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
