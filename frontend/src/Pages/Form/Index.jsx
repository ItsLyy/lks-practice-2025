import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import Primary from "../../Components/PrimaryAction";
import axiosClient from "../../api/axios-client";

export default function FormIndex() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    axiosClient.get("/forms").then((res) => {
      setForms(res.data.forms);
    });
  }, []);

  return (
    <section>
      <div className="mx-auto px-2 py-4 md:container">
        <header className="flex items-center justify-between rounded-md bg-white px-8 py-4 shadow-sm shadow-black/10">
          <h1 className="text-xl font-semibold">All Forms</h1>
          <Primary.Link to="/add-form">Add Form</Primary.Link>
        </header>
        <div className="mt-4 grid grid-cols-3 gap-4">
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
