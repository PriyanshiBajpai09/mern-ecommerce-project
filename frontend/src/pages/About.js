import React from "react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0A1931, #1A3D63)",
        }}
      >
        <div
          className="row w-75 shadow-lg rounded-4 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="col-md-6 p-0">
            <img
              src="/images/aboutus.jpg"
              alt="about"
              className="img-fluid h-100 w-100"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="col-md-6 p-5 text-light d-flex flex-column justify-content-center">
            <h2 style={{ color: "#E6C07B" }}>About TechStore</h2>

            <p className="mt-3" style={{ color: "#cbd5e1" }}>
              Welcome to our e-commerce platform! We aim to provide a smooth and
              seamless online shopping experience where users can explore
              products easily and shop with confidence.
            </p>

            <p style={{ color: "#cbd5e1" }}>
              Our platform focuses on clean UI, secure authentication, and
              reliable backend performance using modern technologies like MERN
              stack.
            </p>

            <p style={{ color: "#cbd5e1" }}>
              We believe in delivering quality products with a premium digital
              experience.
            </p>

            <button
              className="btn mt-3"
              style={{
                background: "linear-gradient(90deg, #1A3D63, #4A7FA7)",
                color: "white",
                borderRadius: "8px",
              }}
              onClick={() => navigate("/")}
            >
              Explore Products
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;