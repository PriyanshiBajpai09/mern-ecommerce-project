import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );

      const p = data?.product;

      setName(p?.name);
      setId(p?._id);
      setDescription(p?.description);
      setPrice(p?.price);
      setQuantity(p?.quantity);
      setShipping(p?.shipping ? "1" : "0");
      setCategory(p?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) setCategories(data?.category);
    } catch {
      toast.error("Error fetching category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      if (photo) productData.append("photo", photo);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product Updated");
        navigate("/dashboard/admin/products");
      }
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted");
      navigate("/dashboard/admin/products");
    } catch {
      toast.error("Delete failed");
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

      {/* RIGHT */}
      <div className="md:col-span-3 space-y-6">

        <h2 className="text-xl font-semibold">
          Update Product
        </h2>

        <form className="bg-white border rounded-xl p-6 shadow-sm space-y-4 max-w-lg">

          {/* CATEGORY */}
          <select
            className="w-full border px-4 py-2 rounded-md text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* IMAGE UPLOAD */}
          <label className="w-full border px-4 py-2 rounded-md text-sm cursor-pointer text-center bg-gray-50 hover:bg-gray-100">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              hidden
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </label>

          {/* IMAGE PREVIEW */}
          <div className="flex justify-center">
            <img
              src={
                photo
                  ? URL.createObjectURL(photo)
                  : `${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`
              }
              className="h-[180px] object-contain rounded-md"
              alt="product"
            />
          </div>

          {/* INPUTS */}
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-md text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
          />

          <textarea
            className="w-full border px-4 py-2 rounded-md text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <input
            type="number"
            className="w-full border px-4 py-2 rounded-md text-sm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />

          <input
            type="number"
            className="w-full border px-4 py-2 rounded-md text-sm"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
          />

          {/* SHIPPING */}
          <select
            className="w-full border px-4 py-2 rounded-md text-sm"
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
          >
            <option value="">Shipping?</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>

          {/* BUTTONS */}
          <button
            onClick={handleUpdate}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Update Product
          </button>

          <button
            onClick={handleDelete}
            className="w-full border py-2 rounded-md hover:bg-gray-100"
          >
            Delete Product
          </button>

        </form>

      </div>
    </div>
  </div>
</div>
    </Layout>
  );
};

export default UpdateProduct;