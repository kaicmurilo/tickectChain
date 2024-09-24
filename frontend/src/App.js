import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import BuyTickets from "./pages/BuyTickets";
import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";

function App({ toggleColorMode, mode }) {
  const location = useLocation();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar toggleColorMode={toggleColorMode} mode={mode} />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/buy-tickets" element={<BuyTickets />} />
          <Route path="/my-account" element={<MyAccount />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;
