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

  // GET CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) setCategories(data.category || []);
    } catch (error) {
      console.log(error);
    }
  };

  // GET PRODUCTS
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts(data?.products || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setProducts([]);
      setLoading(false);
    }
  };

  // GET TOTAL
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  // FILTER
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // LOAD MORE
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts([...(products || []), ...(data?.products || [])]);
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

        {/* FILTER */}
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

        {/* PRODUCTS */}
        <div className="col-md-9 offset-1">
          <h2 className="text-center home-title">Explore Products</h2>

          <div className="d-flex flex-wrap justify-content-center">

            {products?.length > 0 ? (
              products.map((p) => (
                <div
                  key={p._id}
                  className="card m-3"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p?.name}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{p?.name}</h5>

                    <p className="card-text">
                      {p?.description?.substring(0, 40) || "No description"}...
                    </p>

                    <p className="card-text">$ {p?.price}</p>

                    <button
                      className="btn btn-primary me-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      Details
                    </button>

                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setCart([...(cart || []), p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...(cart || []), p])
                        );
                        toast.success("Added to cart");
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center mt-5">No Products Available</p>
            )}

          </div>

          {/* LOAD MORE */}
          <div className="text-center mt-3">
            {products?.length < total && (
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