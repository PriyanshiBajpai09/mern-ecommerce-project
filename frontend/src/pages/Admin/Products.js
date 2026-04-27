import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen pt-[90px] flex justify-center">

        <div className="w-full max-w-6xl px-6 py-10">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* LEFT MENU */}
            <div>
              <div className="bg-white border rounded-xl p-5 shadow-sm sticky top-[100px]">
                <AdminMenu />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:col-span-3 space-y-6">

              <h2 className="text-xl font-semibold">
                All Products
              </h2>

              {/* GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="group"
                  >
                    <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">

                      {/* IMAGE */}
                      <div className="overflow-hidden">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="w-full h-[200px] object-contain p-4 group-hover:scale-105 transition"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="p-4">

                        <h3 className="text-sm font-medium mb-1 line-clamp-1">
                          {p.name}
                        </h3>

                        <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                          {p.description}
                        </p>

                        <p className="font-semibold text-sm">
                          ₹ {p.price}
                        </p>

                      </div>

                    </div>
                  </Link>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Products;