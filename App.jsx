import "./App.css";
import Navbar from "./components/Navbar";
import FileFir from "./pages/FileFir";
import FetchFir from "./pages/FetchFir";

function App() {
  return (
    <div className="App">
      <Navbar />
      <FileFir />
      <FetchFir />
    </div>
  );
}

export default App;
