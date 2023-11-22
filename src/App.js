import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";

import ProductCard from "./components/ProductCard";
import GeneralTable from "./components/GeneralTable";

function App() {
  // this is for used in ProductCard Component
  const apiEndpoints = [
    "https://localhost:7190/api/Employee/List",
    "https://fakestoreapi.com/products",
  ];

  //this is used in general table for fetching multiple api endpoints in reusable componenets
  const api = {
    employees: "https://localhost:7190/api/Employee/List",
    product: "https://fakestoreapi.com/products",
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeForm />} />
          <Route
            path="/show-lists"
            element={<ProductCard apiEndpoints={apiEndpoints} />}
          />
          <Route path="/lists" element={<GeneralTable apiEndpoints={api} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
