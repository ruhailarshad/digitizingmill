import "./App.css";
import Routes from "./routes";
import BaseRouter from "./routes";
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient(); 

function App() {

  return (
    <div className="App">
      
          <QueryClientProvider client={queryClient}>
      <BaseRouter>
            <Routes />
      </BaseRouter>
          </QueryClientProvider>
    </div>
  );
}

export default App;
