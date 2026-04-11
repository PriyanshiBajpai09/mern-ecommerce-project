import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <Layout>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div
          className="text-center p-5 rounded-4 shadow-lg"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            color: "#EAF4FF",
            width: "400px",
          }}
        >
          <h1 style={{ fontSize: "80px", color: "#E6C07B" }}>404</h1>

          <h3 className="mb-3">Page Not Found</h3>

          <p style={{ color: "#cbd5e1" }}>
            Oops! The page you're looking for doesn’t exist.
          </p>

          <Link
            to="/"
            className="btn mt-3"
            style={{
              background: "linear-gradient(90deg, #1A3D63, #4A7FA7)",
              color: "white",
            }}
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Pagenotfound;