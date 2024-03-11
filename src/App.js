import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./layouts/Main";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Signin";

function App() {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
