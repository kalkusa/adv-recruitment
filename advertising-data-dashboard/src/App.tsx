import "./App.css";
import { FilterProvider } from "./contexts/FilterContext";
import { ParsedDataProvider } from "./contexts/ParsedDataContext";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <FilterProvider>
      <ParsedDataProvider>
        <HomePage />
      </ParsedDataProvider>
    </FilterProvider>
  );
}

export default App;
