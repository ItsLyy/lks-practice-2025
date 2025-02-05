import { useContext, useState } from "react";
import InputText from "../../Components/InputText";
import LabelError from "../../Components/LabelError";
import axiosClient from "../../axios/axios-client";
import { Navigate, useNavigate } from "react-router";
import { AppContext } from "../../Contexts/AppContext";

export default function Register() {
  const { token } = useContext(AppContext);

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <section id="auth">
      <div className="container">
        <RegisterForm />
      </div>
    </section>
  );
}

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setErrors({});
    setErrorMessages("");
    if (password !== passwordConfirmation) {
      setErrorMessages("Password confimation incorrect");
      return;
    }

    setLoading(true);

    const data = {
      email,
      password,
      username,
      role: "pembaca",
    };

    axiosClient
      .post("/register", data)
      .then(() => {
        navigate("/login");
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
      <h1>Register</h1>
      <div className="input__row">
        <InputText
          id="username"
          placeholder="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          labelRequired
        />
        <LabelError value={errors.username && errors.username[0]} />
      </div>
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
      <div className="input__row">
        <InputText
          id="password"
          label="Password Confirmation"
          type="password"
          placeholder="repeat password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          labelRequired
        />
      </div>
      {errorMessages && (
        <div className="message__error">
          <span className="label__error">{errorMessages}</span>
        </div>
      )}
      <div className="input__row">
        <button className="btn__primary" disabled={loading}>
          Register
        </button>
      </div>
    </form>
  );
};
