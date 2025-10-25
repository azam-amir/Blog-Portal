import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom/dist";
import "./App.css";
import AuthenticatedRoutes from "./Pages/Routes/AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./Pages/Routes/UnAuthenticatedRoutes";
import { AuthService } from "./services/AuthService";

function App() {
  const authenticated = AuthService.isUserLoggedIn();
  return (
    <ConfigProvider>
      <AntdApp>
        <BrowserRouter>
          {!authenticated ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
