import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>

      {/* HERO SECTION */}
      <div className="relative h-[50vh] w-full">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
          alt="categories"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-semibold mb-3">
            Explore Categories
          </h1>
          <p className="text-sm md:text-base opacity-90">
            Find products based on your interests
          </p>
        </div>
      </div>

      {/* CATEGORY SECTION WITH BG IMAGE */}
      <div className="relative py-16 flex justify-center overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
        </div>

        {/* CONTENT */}
        <div className="w-full max-w-5xl px-6">
          <div className="flex flex-wrap justify-center gap-8">

            {categories.map((c) => (
              <Link key={c._id} to={`/category/${c.slug}`} className="group">

                <div className="bg-white/90 backdrop-blur-sm px-10 py-8 rounded-xl border shadow-sm hover:shadow-md transition duration-300 min-w-[220px] text-center">

                  <h3 className="text-lg font-medium group-hover:tracking-wide transition">
                    {c.name}
                  </h3>

                </div>

              </Link>
            ))}

          </div>
        </div>

      </div>

    </Layout>
  );
};

export default Categories;