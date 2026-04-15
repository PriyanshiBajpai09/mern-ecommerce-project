import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div
        className="container-fluid py-4"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0A1931, #1A3D63)",
        }}
      >
        <h3 className="text-center mb-2" style={{ color: "#E6C07B" }}>
          Category - {category?.name}
        </h3>

        <p className="text-center mb-4" style={{ color: "#cbd5e1" }}>
          {products?.length} products found
        </p>

        <div className="d-flex flex-wrap justify-content-center">
          {products?.map((p) => (
            <div
              key={p._id}
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
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
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
                  <p style={{ fontSize: "14px", height: "40px", overflow: "hidden" }}>
                    {p.description?.substring(0, 40)}...
                  </p>
                  <p style={{ color: "#E6C07B" }}>$ {p.price}</p>
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-sm"
                    style={{
                      background: "linear-gradient(90deg, #1A3D63, #4A7FA7)",
                      color: "white",
                    }}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    Details
                  </button>

                  <button
                    className="btn btn-sm"
                    style={{
                      background: "#0A1931",
                      border: "1px solid #4A7FA7",
                      color: "white",
                    }}
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Added to cart");
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;