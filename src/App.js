import "./App.css";
import Routes from "./routes";
import BaseRouter from "./routes";
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { UserProvider } from "./pages/Login/userContext";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log('error', error);
    }
  })
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
