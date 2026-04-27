import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // GET USERS
  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-users`
      );
      if (data?.success) {
        setUsers(data.users);
      }
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // DELETE USER
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/auth/delete-user/${id}`
      );
      if (data.success) {
        toast.success("User deleted");
        getUsers();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // ADD USER (basic)
  const handleAddUser = (e) => {
    e.preventDefault();

    if (!name || !email) {
      return toast.error("Fill all fields");
    }

    const newUser = {
      _id: Date.now(),
      name,
      email,
    };

    setUsers([...users, newUser]);
    setName("");
    setEmail("");

    toast.success("User added (frontend only)");
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
                Manage Users
              </h2>

              {/* ADD USER */}
              <form
                onSubmit={handleAddUser}
                className="bg-white border rounded-xl p-5 shadow-sm flex gap-3"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 border px-4 py-2 rounded-md text-sm"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 border px-4 py-2 rounded-md text-sm"
                />

                <button className="bg-black text-white px-5 rounded-md">
                  Add
                </button>
              </form>

              {/* USERS TABLE */}
              <div className="bg-white border rounded-xl p-5 shadow-sm overflow-x-auto">

                <table className="w-full text-sm">

                  <thead className="border-b text-left">
                    <tr>
                      <th className="py-2">Name</th>
                      <th className="py-2">Email</th>
                      <th className="py-2">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users?.map((u) => (
                      <tr key={u._id} className="border-b">

                        <td className="py-3">{u.name}</td>
                        <td className="py-3">{u.email}</td>

                        <td className="py-3">
                          <button
                            onClick={() => handleDelete(u._id)}
                            className="px-3 py-1 text-xs bg-black text-white rounded-md hover:bg-gray-800"
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
    </Layout>
  );
};

export default Users;