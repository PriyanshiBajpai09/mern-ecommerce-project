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

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/1`
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

      {/* 🔥 HERO CARD */}
      <div className="pt-[90px] flex justify-center">
        <div className="w-full max-w-6xl px-6">

          <div className="relative rounded-2xl overflow-hidden shadow-lg">

            <img
              src="https://plus.unsplash.com/premium_photo-1681488350342-19084ba8e224?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww"
              className="w-full h-[70vh] object-cover"
              alt=""
            />

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute inset-0 flex items-center px-10">
              <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-xl max-w-xl border border-white/20">

                <h1 className="text-4xl md:text-6xl text-white font-semibold">
                  NEW COLLECTION
                </h1>

                <p className="text-gray-200 mt-3">
                  Discover latest products
                </p>

                <button
                  onClick={() => navigate("/categories")}
                  className="mt-6 px-6 py-2 border text-white hover:bg-white hover:text-black transition"
                >
                  SHOP NOW
                </button>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 🔥 SECTION WITH BG */}
      <div className="min-h-screen relative mt-10">

        {/* FIXED BG */}
        <div className="fixed inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            className="w-full h-full object-cover blur-md opacity-30"
            alt=""
          />
        </div>

        <div className="px-6 md:px-12 py-16">

          <h2 className="text-4xl font-semibold mb-12 text-center">
            New Arrivals
          </h2>

          {/* 🔥 SCROLL CONTAINER */}
          <div className="overflow-hidden">

            <div className="flex gap-6 animate-scroll whitespace-nowrap">

              {[...products, ...products].map((p, i) => (
                <div
                  key={i}
                  className="min-w-[250px] bg-white/80 backdrop-blur-md rounded-xl border shadow-sm hover:shadow-md transition group cursor-pointer"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  <div className="overflow-hidden rounded-t-xl">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="w-full h-[220px] object-cover group-hover:scale-105 transition"
                      alt=""
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-sm font-medium line-clamp-1">
                      {p.name}
                    </p>

                    <p className="text-gray-500 text-sm mb-3">
                      ₹ {p.price}
                    </p>

                    <button
                      className="w-full border border-black py-2 text-xs tracking-widest hover:bg-black hover:text-white transition"
                      onClick={(e) => {
                        e.stopPropagation();

                        const already = cart.find(
                          (item) => item._id === p._id
                        );

                        if (already) {
                          toast("Already in cart");
                        } else {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Added to cart");
                        }
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
      </div>

    </Layout>
  );
};

export default HomePage;