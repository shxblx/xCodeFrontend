import React, { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";

const Navbar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#61677A] p-4 fixed top-0 left-0 right-0 z-50 rounded-lg shadow-lg mx-4 mt-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Playwrite IN', cursive" }}
          >
            Task Manager
          </h1>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <button
            onClick={onLogout}
            className="hidden md:flex items-center gap-2 bg-white text-[#61677A] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 bg-white text-[#61677A] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
