import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // GET PRODUCT
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  // RELATED PRODUCTS
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  useEffect(() => {
    if (product?._id && product?.category?._id) {
      getSimilarProducts(product._id, product.category._id);
    }
  }, [product]);

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pt-[90px] relative">

        {/* 🔥 FIXED BLUR BACKGROUND */}
        <div className="fixed inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            className="w-full h-full object-cover blur-md opacity-30"
            alt=""
          />
        </div>

        {/* CONTENT */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl px-6 py-10">

            {/* PRODUCT CARD */}
            <div className="bg-white/80 backdrop-blur-md rounded-xl border shadow-md p-6 md:p-10">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* IMAGE */}
                <div className="flex justify-center items-center">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    className="w-full max-w-[350px] object-contain"
                    alt=""
                  />
                </div>

                {/* DETAILS */}
                <div className="flex flex-col justify-center">

                  <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                    {product.name}
                  </h1>

                  <p className="text-sm text-gray-400 mb-4">
                    In stock
                  </p>

                  <p className="text-lg font-semibold mb-6">
                    ₹ {product.price}
                  </p>

                  <p className="text-sm text-gray-600 mb-8">
                    {product.description}
                  </p>

                  <button
                    className="bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
                    onClick={() => {
                      const already = cart.find(
                        (item) => item._id === product._id
                      );

                      if (already) {
                        toast("Already in cart");
                      } else {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Added to cart");
                      }
                    }}
                  >
                    ADD TO CART
                  </button>

                </div>

              </div>

            </div>

            {/* RELATED PRODUCTS */}
            <div className="mt-14">

              <h2 className="text-xl font-semibold mb-6 text-center">
                You may also like
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {relatedProducts?.map((p) => (
                  <div
                    key={p._id}
                    className="bg-white/80 backdrop-blur-md border rounded-xl p-4 hover:shadow-md transition cursor-pointer"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="w-full h-[180px] object-cover rounded mb-3"
                      alt=""
                    />

                    <h3 className="text-sm font-medium line-clamp-1">
                      {p.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      ₹ {p.price}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
};

export default ProductDetails;