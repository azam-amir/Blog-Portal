import { Route, Routes } from "react-router-dom/dist";
import MainLayout from "../../components/Layout/Layout";
import { ROUTES } from "./route.constant";

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {ROUTES?.map((route, index) => (
          <Route key={index} path={route?.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default AuthenticatedRoutes;
