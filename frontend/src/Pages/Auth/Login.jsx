import { useContext, useState } from "react";
import InputText from "../../Components/InputText";
import ErrorLabel from "../../Components/ErrorLabel";
import { AppContext } from "../../Context/AppContext.jsx";
import GuestLayout from "../../Layout/GuestLayout.jsx";
import axiosClient from "../../api/axios-client.jsx";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken } = useContext(AppContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setError({});
    setErrorMessage("");

    axiosClient
      .post("/auth/login", data)
      .then((res) => {
        setToken(res.data.user.accessToken);
      })
      .catch((error) => {
        if (error.response.data.errors) {
          setError(error.response.data.errors);
        } else {
          setErrorMessage(error.response.data.message);
        }
      });
  };

  return (
    <GuestLayout>
      <section className="flex h-svh w-full items-center justify-center">
        <div className="w-full max-w-96 rounded-lg bg-white shadow-[0_0_10px_1px] shadow-[#0000020]">
          <h1 className="border-b-[1px] border-[#00000010] px-8 py-4 text-3xl font-semibold">
            Login
          </h1>
          <form
            className="flex flex-col gap-4 px-8 py-4"
            onSubmit={onSubmitHandler}
          >
            <div>
              <InputText
                label="Email"
                id="email"
                type="text"
                placeholder="Enter your email"
                value={data.email}
                onChange={(e) =>
                  setData((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
                    };
                  })
                }
              />
              <ErrorLabel value={error.email && error.email[0]} />
            </div>
            <div>
              <InputText
                label="Password"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={(e) =>
                  setData((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
                    };
                  })
                }
              />
              <ErrorLabel value={error.password && error.password[0]} />
            </div>
            <div className="my-5">
              <input
                type="submit"
                className="w-full cursor-pointer rounded-md bg-gradient-to-b from-sky-500 to-sky-600 px-4 py-2 text-white active:brightness-50"
                value="Login"
              />
              <ErrorLabel value={errorMessage} />
            </div>
          </form>
        </div>
      </section>
    </GuestLayout>
  );
};

export default Login;
