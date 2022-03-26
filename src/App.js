import "./App.css";
import Routes from "./routes";
import BaseRouter from "./routes";

function App() {
  return (
    <div className="App">
      <BaseRouter>
          <Routes />
      </BaseRouter>
    </div>
  );
}

export default App;
