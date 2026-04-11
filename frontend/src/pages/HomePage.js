import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  return (
    <Layout title={"All Products"}>
      <div className="container-fluid row mt-3 home-container">
        <div className="col-md-2 filter-box">
          <h5 className="filter-title">Categories</h5>
          {categories?.map((c) => (
            <Checkbox
              key={c._id}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}

          <h5 className="filter-title mt-4">Price</h5>
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices?.map((p) => (
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>

          <button
            className="btn btn-danger mt-3"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>

        <div className="col-md-9 offset-1">
          <h2 className="text-center home-title">Explore Products</h2>

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
                          JSON.stringify([...cart, p]),
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

          <div className="text-center mt-3">
            {products.length < total && (
              <button
                className="btn btn-warning"
                onClick={() => setPage(page + 1)}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
