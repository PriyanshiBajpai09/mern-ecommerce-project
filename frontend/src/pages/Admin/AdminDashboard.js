import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="bg-transparent min-h-screen pt-[90px] flex justify-center">

        <div className="w-full max-w-6xl px-6 py-10">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* LEFT MENU */}
            <div className="md:col-span-1">
              <div className="bg-white border rounded-xl p-5 shadow-sm sticky top-[100px]">
                <AdminMenu />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:col-span-3 space-y-8">

              {/* TOP GREETING CARD */}
              <div className="bg-white border rounded-xl p-6 shadow-sm flex justify-between items-center">

                <div>
                  <h2 className="text-xl font-semibold">
                    Welcome, {auth?.user?.name} 👋
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Here's your admin overview
                  </p>
                </div>

                <div className="text-3xl">📊</div>

              </div>

              {/* PROFILE CARD */}
              <div className="bg-white border rounded-xl p-8 shadow-sm">

                <h3 className="text-lg font-semibold mb-6">
                  Admin Profile
                </h3>

                <div className="space-y-4 text-sm text-gray-700">

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Name</span>
                    <span className="font-medium">{auth?.user?.name}</span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium">{auth?.user?.email}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Contact</span>
                    <span className="font-medium">{auth?.user?.phone}</span>
                  </div>

                </div>

                {/* BUTTON */}
                <button className="w-full mt-8 bg-black text-white py-2.5 text-sm rounded-md hover:bg-gray-800 transition">
                  Go to Admin Panel
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default AdminDashboard;