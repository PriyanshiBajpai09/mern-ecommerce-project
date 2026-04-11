import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div
        className="container-fluid py-4"
        style={{
          background: "linear-gradient(135deg, #0A1931, #1A3D63)",
          minHeight: "100vh",
        }}
      >
        <div className="row">

          <div className="col-md-3 mb-3">
            <div
              style={{
                background: "rgba(74,127,167,0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
                padding: "20px",
                color: "#EAF4FF",
              }}
            >
              <AdminMenu />
            </div>
          </div>

          <div className="col-md-9 d-flex justify-content-center align-items-center">
            <div
              style={{
                width: "100%",
                maxWidth: "500px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                borderRadius: "20px",
                padding: "30px",
                color: "#F6FAFD",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              }}
            >
              <h2
                style={{
                  color: "#E6C07B",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                Admin Profile
              </h2>

              <p><strong>Name:</strong> {auth?.user?.name}</p>
              <p><strong>Email:</strong> {auth?.user?.email}</p>
              <p><strong>Contact:</strong> {auth?.user?.phone}</p>

              <button
                className="btn w-100 mt-3"
                style={{
                  background: "linear-gradient(90deg, #1A3D63, #4A7FA7)",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                Admin Panel
              </button>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;