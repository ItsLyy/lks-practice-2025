import { Outlet } from "react-router";
import AuthenticatedLayout from "./Layout/AuthenticatedLayout";

function App() {
  return (
    <AuthenticatedLayout>
      <Outlet />
    </AuthenticatedLayout>
  );
}

export default App;
