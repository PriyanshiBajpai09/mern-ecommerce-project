import React from "react";
import Layout from "../components/layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
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
              src="/images/contactus.jpg"
              alt="contact"
              className="img-fluid w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="col-md-6 p-5 text-light d-flex flex-column justify-content-center">
            <h2 style={{ color: "#E6C07B" }}>Contact Us</h2>

            <p className="mt-3" style={{ color: "#cbd5e1" }}>
              Feel free to reach out to us anytime. We are here to help you with
              your queries and provide the best support experience.
            </p>

            <div className="mt-3">
              <p style={{ color: "#cbd5e1" }}>
                <BiMailSend size={20} /> support@techstore.com
              </p>

              <p style={{ color: "#cbd5e1" }}>
                <BiPhoneCall size={20} /> +91 8976534210
              </p>

              <p style={{ color: "#cbd5e1" }}>
                <BiSupport size={20} /> 1800-000-000 (Toll Free)
              </p>
            </div>

            <button
              className="btn mt-3"
              style={{
                background: "linear-gradient(90deg, #1A3D63, #4A7FA7)",
                color: "white",
                borderRadius: "8px",
              }}
            >
              Get Support
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;