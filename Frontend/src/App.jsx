import React from "react";
import Form from "./components/Form";
import { Route, Routes } from "react-router-dom";
import Premium from "./pages/Premium";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <div className="select-none">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
