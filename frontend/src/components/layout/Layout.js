import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #0A1931, #1A3D63)",
      }}
    >
      <Header />

      <main
        style={{
          flex: "1",
          padding: "20px",
        }}
      >
        <Toaster position="top-right" />
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;