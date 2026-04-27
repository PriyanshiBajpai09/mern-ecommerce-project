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
      <div className="min-h-screen pt-[90px] relative">

        {/* 🔥 FIXED BACKGROUND */}
        <div className="fixed inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            className="w-full h-full object-cover blur-md opacity-30"
            alt=""
          />
        </div>

        {/* CONTENT */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl px-6 py-12 text-center">

            {/* TITLE */}
            <h1 className="text-4xl font-semibold mb-3">
              Search Results
            </h1>

            <p className="text-gray-500 mb-10">
              {values?.results.length < 1
                ? "No Products Found 😕"
                : `Found ${values?.results.length} products`}
            </p>

            {/* EMPTY STATE */}
            {values?.results.length < 1 && (
              <div className="py-20 text-gray-500">
                Try searching something else...
              </div>
            )}

            {/* PRODUCTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {values?.results.map((p) => (
                <div
                  key={p._id}
                  className="bg-white/80 backdrop-blur-md rounded-xl border p-4 hover:shadow-md transition cursor-pointer group"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  {/* IMAGE */}
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="w-full h-[200px] object-cover rounded-md mb-3 group-hover:scale-105 transition"
                  />

                  {/* CONTENT */}
                  <div className="text-left">

                    <h3 className="text-sm font-medium mb-1 line-clamp-1">
                      {p.name}
                    </h3>

                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                      {p.description}
                    </p>

                    <p className="font-semibold mb-3">
                      ₹ {p.price}
                    </p>

                    {/* BUTTONS */}
                    <div
                      className="flex justify-between"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => navigate(`/product/${p.slug}`)}
                        className="text-xs border px-3 py-1 rounded-md hover:bg-black hover:text-white transition"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => {
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
                        className="text-xs bg-black text-white px-3 py-1 rounded-md hover:bg-gray-800 transition"
                      >
                        Add
                      </button>
                    </div>

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

export default Search;