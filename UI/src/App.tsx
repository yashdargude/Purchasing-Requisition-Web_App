// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import ProductForm from "./components/ui/custom/ProductForm";
import ProductCard from "./components/ui/custom/ProductCard";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<ProductForm />} />
            <Route path="/product/:id?" element={<ProductCard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
