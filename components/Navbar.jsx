import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // you can install lucide-react for icons

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg fixed top-0 w-full z-50">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Moises Water Refill Station</h1>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-200">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-200">
            Contact
          </Link>
          <Link to="/login" className="hover:text-gray-200">
            Login
          </Link>
        </div>
      </div>

      {open && (
        <div className="flex flex-col mt-4 space-y-2 md:hidden">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <Link to="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
