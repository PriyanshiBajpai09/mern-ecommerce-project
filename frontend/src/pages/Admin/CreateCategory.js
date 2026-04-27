import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} created`);
        setName("");
        getAllCategory();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // GET
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success("Category updated");
        setVisible(false);
        setUpdatedName("");
        setSelected(null);
        getAllCategory();
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success("Category deleted");
        getAllCategory();
      }
    } catch (error) {
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

            {/* RIGHT CONTENT */}
            <div className="md:col-span-3 space-y-6">

              <h2 className="text-xl font-semibold">
                Manage Categories
              </h2>

              {/* CREATE FORM */}
              <div className="bg-white border rounded-xl p-5 shadow-sm">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>

              {/* TABLE */}
              <div className="bg-white border rounded-xl p-5 shadow-sm">

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">

                    <thead className="border-b text-left">
                      <tr>
                        <th className="py-2">Name</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {categories?.map((c) => (
                        <tr key={c._id} className="border-b">

                          <td className="py-3">{c.name}</td>

                          <td className="py-3 flex gap-2">

                            <button
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                              className="px-3 py-1 text-xs border rounded-md hover:bg-black hover:text-white transition"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(c._id)}
                              className="px-3 py-1 text-xs bg-black text-white rounded-md hover:bg-gray-800 transition"
                            >
                              Delete
                            </button>

                          </td>

                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MODAL */}
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <CategoryForm
          value={updatedName}
          setValue={setUpdatedName}
          handleSubmit={handleUpdate}
        />
      </Modal>

    </Layout>
  );
};

export default CreateCategory;