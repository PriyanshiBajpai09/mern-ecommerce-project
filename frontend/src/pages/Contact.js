import React from "react";
import Layout from "../components/layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
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
        <div className="flex justify-center px-4 md:px-6 py-10">

          <div className="w-full max-w-6xl">

            {/* CARD */}
            <div className="bg-white/90 backdrop-blur-sm border rounded-xl shadow-sm p-6 md:p-10">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* LEFT IMAGE */}
                <div>
                  <img
                    src="/images/contactus.jpg"
                    alt="contact"
                    className="w-full h-[300px] md:h-full object-cover rounded-lg"
                  />
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex flex-col justify-center">

                  <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                    Contact Us
                  </h2>

                  <p className="text-gray-600 text-sm mb-6">
                    Feel free to reach out to us anytime. We are here to help you
                    with your queries and provide the best support experience.
                  </p>

                  {/* INFO */}
                  <div className="space-y-3 mb-6 text-sm text-gray-700">

                    <p className="flex items-center gap-2">
                      <BiMailSend size={18} />
                      support@estore.com
                    </p>

                    <p className="flex items-center gap-2">
                      <BiPhoneCall size={18} />
                      +91 8976534210
                    </p>

                    <p className="flex items-center gap-2">
                      <BiSupport size={18} />
                      1800-000-000 (Toll Free)
                    </p>

                  </div>

                  
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Contact;