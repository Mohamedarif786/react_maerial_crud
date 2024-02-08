import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Crud from "./pages/crud";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProdIndex from "./pages/product/prodIndex";
import ProdForm from "./pages/product/ProdForm";
import ProductEdit from "./pages/product/ProductEdit";
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/crud"} />} />
          <Route path="/crud" element={<Crud />} />
          <Route path="/product-page" element={<ProdIndex />} />
          <Route path="/product-page/add" element={<ProdForm />} />
          <Route path="product-edit/:id" element={<ProductEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
