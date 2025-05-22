import { BrowserRouter } from "react-router-dom/dist";
import "./App.css";
import AuthenticatedRoutes from "./Pages/Routes/AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./Pages/Routes/UnAuthenticatedRoutes";
import { AuthService } from "./services/AuthService";

function App() {
  const authenticated = AuthService.isUserLoggedIn();
  return (
    <div className="app">
      <BrowserRouter>
        {!authenticated ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
      </BrowserRouter>
    </div>
  );
}

export default App;
