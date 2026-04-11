import React from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";

const Orders = () => {
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
                height: "100%",
              }}
            >
              <UserMenu />
            </div>
          </div>

          <div className="col-md-9 d-flex justify-content-center">
            <div
              style={{
                width: "100%",
                maxWidth: "700px",
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
                My Orders
              </h2>

              <div
                style={{
                  textAlign: "center",
                  padding: "30px",
                  color: "#B3CFE5",
                }}
              >
                📦 No orders yet
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;