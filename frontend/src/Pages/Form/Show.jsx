import { useEffect, useState } from "react";
import InputGroup from "../../Components/InputGroup";
import Primary from "../../Components/PrimaryAction";
import Wrapper from "../../Components/Wrapper";
import { useParams } from "react-router";
import axiosClient from "../../api/axios-client";

export default function FormShow() {
  const [form, setForm] = useState({});
  const [access, setAccess] = useState(true);
  const { slug } = useParams();
  useEffect(() => {
    axiosClient
      .get(`/forms/${slug}`)
      .then((res) => {
        setForm(res.data.form);
      })
      .catch((err) => {
        const errorStatus = err.response.status;
        if (errorStatus === 403) {
          setAccess(false);
        }
      });
  }, [slug]);

  return (
    <section>
      <header className="border-t-[1px] border-zinc-100 bg-white p-2 shadow-md shadow-black/5">
        <div className="mx-auto flex justify-end gap-2 px-4 md:container">
          <div className="border-r-[1px] border-zinc-100 px-2">
            <InputGroup>
              <InputGroup.Text readOnly value={window.location.href} />
              <InputGroup.Copy value={window.location.href} />
            </InputGroup>
          </div>
          <Primary.Button>Save</Primary.Button>
        </div>
      </header>
      <div className="mx-auto py-4 md:container">
        {access ? (
          <Wrapper className="mx-auto w-full max-w-[500px] space-y-2">
            <h1 className="text-2xl font-semibold">{form.name}</h1>
            <p className="opacity-80">{form.description}</p>
          </Wrapper>
        ) : (
          <ForbiddenAccess />
        )}
      </div>
    </section>
  );
}

const ForbiddenAccess = () => {
  return (
    <Wrapper className="mx-auto w-full max-w-[500px] space-y-2">
      <h1 className="text-2xl font-semibold">Forbidden Access.</h1>
      <p className="opacity-80">
        You don't have a permission to access this form.
      </p>
    </Wrapper>
  );
};
