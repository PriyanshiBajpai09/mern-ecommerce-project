import React from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";

const Orders = () => {
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

            {/* RIGHT CONTENT */}
            <div className="md:col-span-3">

              <div className="bg-white border rounded-xl p-8 shadow-sm">

                {/* TITLE */}
                <h2 className="text-xl font-semibold mb-6">
                  My Orders
                </h2>

                {/* EMPTY STATE */}
                <div className="flex flex-col items-center justify-center py-16 text-center">

                  <div className="text-5xl mb-4">📦</div>

                  <p className="text-gray-500 text-sm">
                    No orders yet
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Orders;