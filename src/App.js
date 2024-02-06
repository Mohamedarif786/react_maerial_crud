import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Crud from "./pages/crud";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/crud"} />} />
          <Route path="/crud" element={<Crud />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
