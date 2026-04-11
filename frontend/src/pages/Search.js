import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Search = () => {
  const [values] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  return (
    <Layout title={"Search results"}>
      <div className="container py-4 text-center">

        <h2 style={{ color: "#E6C07B" }}>Search Results</h2>

        <p style={{ color: "#cbd5e1" }}>
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length} products`}
        </p>

        <div className="d-flex flex-wrap justify-content-center mt-4">
          {values?.results.map((p) => (
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
                  <p style={{ fontSize: "14px", height: "40px", overflow: "hidden" }}>
                    {p.description.substring(0, 40)}...
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

export default Search;