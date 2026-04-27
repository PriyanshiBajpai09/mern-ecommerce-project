import React from "react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

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

            {/* 🔥 CARD */}
            <div className="bg-white/90 backdrop-blur-sm border rounded-xl shadow-sm p-6 md:p-10">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* LEFT IMAGE */}
                <div>
                  <img
                    src="/images/aboutus.jpg"
                    alt="about"
                    className="w-full h-[300px] md:h-full object-cover rounded-lg"
                  />
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex flex-col justify-center">

                  <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                    About TechStore
                  </h2>

                  <p className="text-gray-600 text-sm mb-3">
                    Welcome to our e-commerce platform! We aim to provide a smooth
                    and seamless online shopping experience where users can explore
                    products easily and shop with confidence.
                  </p>

                  <p className="text-gray-600 text-sm mb-3">
                    Our platform focuses on clean UI, secure authentication, and
                    reliable backend performance using modern technologies like
                    MERN stack.
                  </p>

                  <p className="text-gray-600 text-sm mb-6">
                    We believe in delivering quality products with a premium digital
                    experience.
                  </p>

                  <button
                    onClick={() => navigate("/")}
                    className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition w-fit"
                  >
                    Explore Products
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default About;