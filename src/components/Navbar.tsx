import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Users } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-red-500 flex items-center">
              <img src="/img/logo.svg" alt="" />
              <span className="ml-5">GAMING</span>
            </h1>
            <div className="flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/"
                    ? "bg-red-600 text-white"
                    : "text-gray-300 hover:bg-red-600 hover:text-white"
                }`}
              >
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />

                  <span className="hidden md:block">Participantes</span>
                </div>
              </Link>
              <Link
                to="/torneo"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/torneo"
                    ? "bg-red-600 text-white"
                    : "text-gray-300 hover:bg-red-600 hover:text-white"
                }`}
              >
                <div className="flex items-center">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  <span className="hidden md:block">Torneo</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
