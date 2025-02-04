import DefaultLayout from "../../Layouts/DefaultLayout";

export default function Login() {
  return (
    <DefaultLayout>
      <form className="flex flex-col">
        <input
          type="text"
          name="username"
          autoComplete="username"
          id="username"
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          autoComplete="password"
          id="password"
          placeholder="Password"
        />
        <button type="submit" className="cursor-pointer">
          Login
        </button>
      </form>
    </DefaultLayout>
  );
}
