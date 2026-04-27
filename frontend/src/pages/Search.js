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
      <div className="bg-[#f6f1e9] min-h-screen pt-[90px] flex justify-center">

        <div className="w-full max-w-6xl px-6 py-12 text-center">

          {/* TITLE */}
          <h1 className="text-4xl font-semibold mb-3">
            Search Results
          </h1>

          <p className="text-gray-500 mb-10">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} products`}
          </p>

          {/* PRODUCTS */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {values?.results.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition"
              >
                {/* IMAGE */}
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="w-full h-[200px] object-contain p-4 cursor-pointer"
                  onClick={() => navigate(`/product/${p.slug}`)}
                />

                {/* CONTENT */}
                <div className="p-4 flex flex-col justify-between h-[160px]">

                  <div>
                    <h3 className="text-sm font-medium mb-1 line-clamp-1">
                      {p.name}
                    </h3>

                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                      {p.description}
                    </p>

                    <p className="font-semibold">
                      ₹ {p.price}
                    </p>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex justify-between mt-3">

                    <button
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="text-xs border px-3 py-1 hover:bg-black hover:text-white transition"
                    >
                      Details
                    </button>

                    <button
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Added to cart");
                      }}
                      className="text-xs bg-black text-white px-3 py-1 hover:bg-gray-800 transition"
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
    </Layout>
  );
};

export default Search;