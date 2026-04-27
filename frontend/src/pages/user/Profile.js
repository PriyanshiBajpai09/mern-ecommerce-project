import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const user = auth?.user;
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });

        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));

        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="bg-transparent min-h-screen pt-[90px] flex justify-center">

        <div className="w-full max-w-6xl px-6 py-10">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* LEFT MENU */}
            <div className="md:col-span-1">
              <div className="bg-white border rounded-xl p-5 shadow-sm sticky top-[100px]">
                <UserMenu />
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="md:col-span-3 flex justify-center">

              <div className="w-full max-w-md bg-white border rounded-xl p-8 shadow-sm">

                <h2 className="text-xl font-semibold mb-6 text-center">
                  Update Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full border px-4 py-2 rounded-md text-sm outline-none focus:border-black"
                  />

                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full border px-4 py-2 rounded-md text-sm bg-gray-100 text-gray-500"
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                    className="w-full border px-4 py-2 rounded-md text-sm outline-none focus:border-black"
                  />

                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full border px-4 py-2 rounded-md text-sm outline-none focus:border-black"
                  />

                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    className="w-full border px-4 py-2 rounded-md text-sm outline-none focus:border-black"
                  />

                  <button
                    type="submit"
                    className="w-full mt-4 bg-black text-white py-2.5 text-sm rounded-md hover:bg-gray-800 transition"
                  >
                    Update Profile
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Profile;