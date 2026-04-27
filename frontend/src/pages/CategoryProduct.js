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
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`,
      );
      setProducts(data?.products || []);
      setCategory(data?.category || {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen pt-[90px] flex justify-center bg-white/40">
        <div className="w-full max-w-6xl px-6 py-12">
          {/* TITLE */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold tracking-tight">
              {category?.name}
            </h1>
            <p className="text-gray-500 mt-2">
              {products.length} products found
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products?.map((p) => (
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

                    <p className="font-semibold">₹ {p.price}</p>
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
                          JSON.stringify([...cart, p]),
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

export default CategoryProduct;
