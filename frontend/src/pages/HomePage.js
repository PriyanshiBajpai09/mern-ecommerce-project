import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);

  // GET PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/1`,
      );
      setProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <div className="pt-[80px]">
        <div className="w-full h-[85vh] relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/20"></div>

          <div className="absolute bottom-10 left-10 text-white">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
              NEW COLLECTION
            </h1>
            <p className="text-sm mt-2 tracking-wide">
              Discover latest products
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 md:px-12 py-16 bg-[#f6f1e9] overflow-hidden">
        <h2 className="text-4xl md:text-5xl font-semibold mb-12 tracking-tight">
          New Arrivals
        </h2>

        <div className="overflow-hidden w-full">
          <div className="animate-scroll gap-8">
            {[...products, ...products].map((p, i) => (
              <div
                key={i}
                className="min-w-[240px] bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 group cursor-pointer"
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                {/* IMAGE */}
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="w-full h-[240px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <p className="text-sm font-medium mb-1 line-clamp-1">
                    {p.name}
                  </p>

                  <p className="text-gray-500 text-sm mb-3">₹ {p.price}</p>

                  {/* BUTTON */}
                  <button
                    className="w-full border border-black py-2 text-xs tracking-widest hover:bg-black hover:text-white transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p]),
                      );
                      toast.success("Added to cart");
                    }}
                  >
                    ADD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
