import "./App.css";
import Routes from "./routes";
import BaseRouter from "./routes";
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'

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
      <BaseRouter>
            <Routes />
      </BaseRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
