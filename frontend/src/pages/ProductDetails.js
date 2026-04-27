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

  // GET RELATED PRODUCTS
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
      <div className="min-h-screen bg-[#f6f1e9] px-6 md:px-16 py-12">

        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-10 tracking-wide">
          Home / Category / Product
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">

          {/* LEFT SIDE */}
          <div className="flex gap-4">

            {/* thumbnails */}
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((_, i) => (
                <img
                  key={i}
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
                  className="w-16 h-20 object-cover cursor-pointer border border-gray-200 hover:border-black transition"
                  alt=""
                />
              ))}
            </div>

            {/* main image */}
            <div className="bg-white p-6 w-full flex items-center justify-center">
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
                className="w-[350px] object-contain transition-transform duration-500 hover:scale-105"
                alt=""
              />
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="max-w-md">

            <h1 className="text-4xl font-semibold tracking-tight mb-3">
              {product?.name}
            </h1>

            <p className="text-sm text-gray-400 mb-6 tracking-wide">
              In stock
            </p>

            <h2 className="text-2xl font-medium mb-8">
              ₹ {product?.price}
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed mb-10">
              {product?.description}
            </p>

          
            {/* BUTTON */}
            <button
              className="w-full border border-black py-4 text-sm tracking-widest hover:bg-black hover:text-white transition duration-300"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem("cart", JSON.stringify([...cart, product]));
                toast.success("Added to cart");
              }}
            >
              ADD TO CART
            </button>

          </div>

        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-24">

          <h2 className="text-3xl font-semibold tracking-tight mb-10">
            You may also like
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

            {relatedProducts?.length > 0 ? (
              relatedProducts.map((p) => (
                <div
                  key={p._id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  <div className="overflow-hidden">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-105"
                      alt=""
                    />
                  </div>

                  <div className="mt-3 text-sm">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-gray-500">₹ {p.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No related products found
              </p>
            )}

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default ProductDetails;