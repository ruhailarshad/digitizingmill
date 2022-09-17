import "./App.css";
import Routes from "./routes";
import BaseRouter from "./routes";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./pages/Login/userContext";
import { AxiosInterceptorsSetup } from "./services/AxiosConfig";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      
    },
  }),
});

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BaseRouter>
            <Routes />
          </BaseRouter>
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
