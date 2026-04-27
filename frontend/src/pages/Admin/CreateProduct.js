import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);

  // GET CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // CREATE PRODUCT
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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
                Create Product
              </h2>

              <form
                onSubmit={handleCreate}
                className="bg-white border rounded-xl p-6 shadow-sm space-y-4"
              >

                {/* CATEGORY */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border px-4 py-2.5 rounded-md text-sm outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                {/* IMAGE UPLOAD */}
                <div>
                  <label className="block text-sm mb-1">
                    Upload Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="w-full text-sm"
                  />

                  {photo && (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="preview"
                      className="mt-3 h-32 object-contain border p-2 rounded-md"
                    />
                  )}
                </div>

                {/* NAME */}
                <input
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border px-4 py-2.5 rounded-md text-sm outline-none focus:ring-1 focus:ring-black"
                />

                {/* DESCRIPTION */}
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border px-4 py-2.5 rounded-md text-sm outline-none focus:ring-1 focus:ring-black"
                />

                {/* PRICE */}
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border px-4 py-2.5 rounded-md text-sm outline-none focus:ring-1 focus:ring-black"
                />

                {/* QUANTITY */}
                <input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full border px-4 py-2.5 rounded-md text-sm outline-none focus:ring-1 focus:ring-black"
                />

                {/* SHIPPING */}
                <select
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                  className="w-full border px-4 py-2.5 rounded-md text-sm outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Shipping?</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2.5 text-sm rounded-md hover:bg-gray-800 transition"
                >
                  Create Product
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default CreateProduct;