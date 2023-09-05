import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard";
import Details from "./screens/Detail";
import NewVehicle from "./screens/NewVehicle";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/details" element={<Details/>} />
          <Route path="/add" element={<NewVehicle/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
