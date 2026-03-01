import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen w-full">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;