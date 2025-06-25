import React from "react";
import { Link } from "react-router-dom";

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6 bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600">403</h1>
      <h2 className="text-2xl font-semibold mt-2">Unauthorized Access</h2>
      <p className="text-gray-600 mt-4 max-w-md">
        You don’t have permission to view this page. If you think this is a mistake, contact the site administrator.
      </p>
      <Link to="/auth/login" className="mt-6 rounded-lg bg-[#4169E1] text-white font-semibold px-6 py-3 hover:bg-[#3151c1] transition-colors">
        Login
      </Link>
    </div>
  );
};

export default Unauthorized;
