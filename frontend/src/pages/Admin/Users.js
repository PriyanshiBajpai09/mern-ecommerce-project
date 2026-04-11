import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";

const Users = () => {
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

          <div className="col-md-9">
            <h2
              style={{
                color: "#E6C07B",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              All Users
            </h2>

            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: "30px",
                borderRadius: "15px",
                color: "#b1b3b6",
                textAlign: "center",
              }}
            >
              <h5>No Users Data Yet</h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
