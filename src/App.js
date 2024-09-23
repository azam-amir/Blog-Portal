import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import "./App.css";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./routes/UnAuthenticatedRoutes";
import { ConfigProvider } from "antd";
import { AuthService } from "./services/auth.service";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 0,
      staleTime: 5 * 1000, //cache expiry time
    },
  },
});

const antdDesignConfig = {
  token: { colorPrimary: "#00b96b" },
};

function App() {
  const authenticated = AuthService.isUserIsLoggedIn(); //is user is logged in or not
  return (
    <ConfigProvider theme={antdDesignConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <BrowserRouter>
            {authenticated && <AuthenticatedRoutes />}

            <UnAuthenticatedRoutes />
          </BrowserRouter>
        </div>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
