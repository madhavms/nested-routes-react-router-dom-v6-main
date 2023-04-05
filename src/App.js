import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";
import Home from "./components/Home";
import Products from "./components/products/Products";
import Login from "./components/Login";
import Search from "./components/products/Search";
import AddProduct from "./components/products/AddProduct";
import ProductDisplay from "./components/products/ProductDisplay";
import ListProducts from "./components/products/ListProducts";

function App() {

  useEffect(() => {
    if (
      !!window["routing-app-style"] &&
      typeof setWidgetStyle === "function"
    ) {
      setWidgetStyle(window["routing-app-style"]);
    }
  }, []);

  return (
    <Router basename="/react-routing-app">
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/login"> Login </Link>
        <Link to="/products/search"> Products </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />}>
          <Route path="search" element={<Search />} />
          <Route path="list" element={<ListProducts />} />
          <Route path="add" element={<AddProduct />} />
          <Route path=":id" element={<ProductDisplay />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
