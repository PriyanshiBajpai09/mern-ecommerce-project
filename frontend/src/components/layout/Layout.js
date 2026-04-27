import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen">

      {/* 🔥 FIXED BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <img
          src="https://i.pinimg.com/736x/b9/a2/84/b9a284897dc39f8f473abf0ecef0b1b7.jpg"
          alt="bg"
          className="w-full h-full object-cover"
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
      </div>

      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="min-h-[80vh]">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default Layout;