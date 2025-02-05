import { useContext, useState } from "react";
import InputText from "../../Components/InputText";
import LabelError from "../../Components/LabelError";
import axiosClient from "../../axios/axios-client";
import { Navigate, useNavigate } from "react-router";
import { AppContext } from "../../Contexts/AppContext";

export default function Login() {
  const { token, setToken } = useContext(AppContext);

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <section id="auth">
      <div className="container">
        <LoginForm setToken={setToken} />
      </div>
    </section>
  );
}

const LoginForm = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setErrors({});
    setErrorMessages("");
    setLoading(true);

    const data = {
      email,
      password,
    };

    axiosClient
      .post("/login", data)
      .then((response) => {
        setToken(response.data.data.token);
        navigate("/");
      })
      .catch((error) => {
        if (error.status === 422) {
          setErrors(error.response.data.errors);
        } else if (
          error.status === 401 &&
          error.response.data.status === "error"
        ) {
          setErrorMessages(error.response.data.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="form__auth" onSubmit={onSubmitHandler}>
      <h1>Login</h1>
      <div className="input__row">
        <InputText
          id="email"
          placeholder="user@example.com"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          labelRequired
        />
        <LabelError value={errors.email && errors.email[0]} />
      </div>
      <div className="input__row">
        <InputText
          id="password"
          label="Password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          labelRequired
        />

        <LabelError value={errors.password && errors.password[0]} />
      </div>
      {errorMessages && (
        <div className="message__error">
          <span className="label__error">{errorMessages}</span>
        </div>
      )}
      <div className="input__row">
        <button className="btn__primary" disabled={loading}>
          Login
        </button>
      </div>
    </form>
  );
};
