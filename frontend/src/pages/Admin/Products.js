import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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

            <h2 className="text-center home-title">All Products</h2>

            <div className="d-flex flex-wrap justify-content-center">

              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card m-3 shadow-lg"
                    style={{
                      width: "18rem",
                      height: "400px",
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      color: "#EAF4FF",
                      borderRadius: "15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      style={{
                        height: "180px",
                        width: "100%",
                        objectFit: "contain",
                        padding: "10px",
                      }}
                    />

                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5>{p.name}</h5>

                        <p
                          style={{
                            fontSize: "14px",
                            height: "40px",
                            overflow: "hidden",
                          }}
                        >
                          {p.description.substring(0, 40)}...
                        </p>

                        <p style={{ color: "#E6C07B" }}>
                          $ {p.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;