import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
function Navbar() {
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);
  const menuItems = [
  { name: "Home", path: "/" },
  { name: "My Events", path: "/myEvents" },
  { name: "My Tickets", path: "/myTickets" },
  { name: "scanTicket", path: "/scanner" },
  { name: "Contact", path: "/contact" },
];
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Call your logout API endpoint here
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/v1/users/logout",{},
        { withCredentials: true }
      );
      if (!response.data.success) {
        throw new Error("Logout failed");
      }
    },
    onSuccess: () => {
      navigate("/guest");
    },
  });
  const handleLogout = () => {
    setOpen(false);
    logoutMutation.mutate();
  }
  return (
    <nav className="bg-white shadow-md px-6 py-4 mb-10">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1 className="font-pop text-2xl md:text-3xl font-bold text-blue-600">
          E-Ticket
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 text-[18px] font-medium">
          {menuItems.map(
            (item) => (
              <li
                key={item.name}
                className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:text-blue-500"
                onClick={()=>{navigate(item.path)}}
              >
                {item.name}
              </li>
            ),
          )}
        </ul>

        {/* Desktop Buttons */}
        <div onClick={handleLogout} className="hidden md:flex space-x-3">
          <button className="font-pop px-4 py-2 bg-black text-white text-[18px] rounded-full hover:bg-blue-700 transition">
            Log out
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 -ml-6 flex flex-col space-y-4 w-full items-center bg-white absolute">
          {menuItems.map((item) => (
            <p
              key={item.name}
              className="cursor-pointer text-lg hover:text-blue-500"
              onClick={()=>{setOpen(false);navigate(item.path);}}
            >
              {item.name}
            </p>
          ))}

          <div className="flex flex-col space-y-2">
            <button onClick={handleLogout} className="px-4 py-2 bg-black text-white rounded-full">
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
