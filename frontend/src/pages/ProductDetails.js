import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        <div
          className="row shadow-lg rounded-4 p-4 mb-5"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            color: "#EAF4FF",
          }}
        >
          <div className="col-md-6 text-center">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              style={{
                height: "300px",
                width: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2 style={{ color: "#E6C07B" }}>{product.name}</h2>

            <p>{product.description}</p>

            <h4 style={{ color: "#E6C07B" }}>$ {product.price}</h4>

            <p>Category: {product?.category?.name}</p>

            <button
              className="btn mt-3"
              style={{
                background: "linear-gradient(90deg, #1A3D63, #4A7FA7)",
                color: "white",
              }}
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Added to cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <h4 className="mb-3" style={{ color: "#E6C07B" }}>
          Related Products
        </h4>

        {relatedProducts.length < 1 && (
          <p style={{ color: "#cbd5e1" }}>No Similar Products found</p>
        )}

        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
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

export default ProductDetails;