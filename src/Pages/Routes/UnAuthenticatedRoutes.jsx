import { Route, Routes } from "react-router-dom";
import { UNAUTHENTICATED_ROUTES } from "./route.constant";

function UnAuthenticatedRoutes() {
  return (
    <Routes>
      {/* <Route element={<MainLayout />}> */}
      {UNAUTHENTICATED_ROUTES?.map((route, index) => (
        <Route key={index} path={route?.path} element={route.element} />
      ))}
      {/* </Route> */}
    </Routes>
  );
}

export default UnAuthenticatedRoutes;
