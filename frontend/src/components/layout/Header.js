import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const [showUser, setShowUser] = useState(false);

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCat(false);
      setShowUser(false);
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <header
      className={`w-full px-6 md:px-10 py-4 flex justify-between items-center fixed top-0 z-50 transition-all duration-300
      ${
        isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-[#f8f5f0]"
      }`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-10">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-semibold tracking-widest">
          E-STORE
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
          <NavLink to="/" className="hover:text-gray-500">
            Home
          </NavLink>

          {/* CATEGORY CLICK DROPDOWN */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <span
              className="cursor-pointer"
              onClick={() => {
                setShowCat(!showCat);
                setShowUser(false);
              }}
            >
              Categories
            </span>

            {showCat && (
              <div className="absolute top-8 left-0 bg-white shadow-lg p-4 min-w-[200px] z-50">
                <Link
                  to="/categories"
                  className="block py-1 hover:text-gray-500"
                  onClick={() => setShowCat(false)}
                >
                  All Categories
                </Link>

                {categories?.map((c) => (
                  <Link
                    key={c._id}
                    to={`/category/${c.slug}`}
                    className="block py-1 hover:text-gray-500"
                    onClick={() => setShowCat(false)}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* SEARCH */}
        <div className="hidden md:block w-[220px]">
          <SearchInput />
        </div>

        {/* AUTH */}
        {!auth?.user ? (
          <div className="flex items-center gap-4 text-sm">
            <NavLink to="/login" className="hover:text-gray-500">
              Login
            </NavLink>
            <NavLink to="/register" className="hover:text-gray-500">
              Register
            </NavLink>
          </div>
        ) : (
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <span
              className="cursor-pointer text-sm"
              onClick={() => {
                setShowUser(!showUser);
                setShowCat(false);
              }}
            >
              {auth?.user?.name}
            </span>

            {showUser && (
              <div className="absolute right-0 top-8 bg-white shadow-lg p-4 min-w-[150px] z-50">
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="block py-1 hover:text-gray-500"
                  onClick={() => setShowUser(false)}
                >
                  Dashboard
                </NavLink>

                <span
                  onClick={() => {
                    handleLogout();
                    setShowUser(false);
                  }}
                  className="block py-1 cursor-pointer hover:text-gray-500"
                >
                  Logout
                </span>
              </div>
            )}
          </div>
        )}

        {/* CART */}
        <NavLink to="/cart" className="relative text-lg">
          🛒
          <span className="absolute -top-2 -right-3 text-xs bg-black text-white px-1.5 rounded-full">
            {cart?.length}
          </span>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
