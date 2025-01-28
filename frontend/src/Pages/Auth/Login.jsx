import { useContext, useState } from "react";
import InputText from "../../Components/InputText";
import ErrorLabel from "../../Components/ErrorLabel";
import api from "../../api/instance.jsx";
import { AppContext } from "../../Context/AppContext.jsx";
import GuestLayout from "../../Layout/GuestLayout.jsx";

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

    api
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
      <section id="login">
        <div className="wrapper">
          <h1>Login</h1>
          <form className="form__login" onSubmit={onSubmitHandler}>
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
            <div>
              <input type="submit" className="input__submit" value="Login" />
              <ErrorLabel value={errorMessage} />
            </div>
          </form>
        </div>
      </section>
    </GuestLayout>
  );
};

export default Login;
