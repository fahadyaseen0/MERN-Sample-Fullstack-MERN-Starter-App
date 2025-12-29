import "./App.css";
import Create from "./Create";
import { Routes, Route } from "react-router-dom";
import Edit from "./Edit";
import Navbar from "./Navbar";
import Home from "./Home";

function App() {
  return (
    <div className="App container">
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
