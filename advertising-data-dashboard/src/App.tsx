import "./App.css";
import { FilterProvider } from "./contexts/FilterContext";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <FilterProvider>
      <HomePage />
    </FilterProvider>
  );
}

export default App;
