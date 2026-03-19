import React, { useState, useRef, useEffect } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef(null);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "My Events", path: "/events" },
    { name: "My Tickets", path: "/tickets" },
    { name: "Offers", path: "/offers" },
    { name: "Contact", path: "/contact" },
  ];

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-4 mb-10">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
          E-Ticket
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 text-[18px] font-medium">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:text-blue-500"
            >
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative">

          {/* Profile */}
          <div ref={dropdownRef} className="relative">
            <img
              src="https://avatars.githubusercontent.com/u/193382994?v=4"
              alt="profile"
              className="w-9 h-9 rounded-full cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />

            {profileOpen && (
              <div className="absolute right-0 top-12 w-40 bg-white border rounded-lg shadow-md">
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Login
                </p>
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Sign Up
                </p>
                <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </p>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 text-center border-t pt-4">
          {menuItems.map((item) => (
            <p
              key={item.name}
              className="cursor-pointer text-lg hover:text-blue-500"
            >
              <a href={item.path}>{item.name}</a>
            </p>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;