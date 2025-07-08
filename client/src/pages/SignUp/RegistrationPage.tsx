import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const RegistrationPage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Logo */}
      <div className="absolute left-4 top-4 sm:left-6 sm:top-6 z-30">
        <h1 className="font-medium text-3xl sm:text-4xl text-black">
          Tech<span className="text-[#4169E1] italic">Ez</span>
        </h1>
      </div>

      {/* Split layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left half */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 sm:px-12 py-16 relative">
          {/* Background image */}
          <div className="absolute inset-0 z-0 opacity-30">
            <img src="/tools1.png" alt="Tools" className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-md border-2 border-black rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-center font-bold text-lg sm:text-xl mb-8">REGISTER AS YOUR PREFERENCE</h2>
            <div className="flex flex-col gap-4">
              <Link
                to="/auth/signup/individual"
                className="w-full p-4 rounded-xl border-2 border-[#4169E1] font-semibold hover:bg-[#4169E1] hover:text-white transition cursor-pointer flex align-center justify-center"
              >
                INDIVIDUAL USER
              </Link>
              <Link
                to="/auth/signup/technician"
                className="flex align-center justify-center w-full p-4 rounded-xl border-2 border-[#4169E1] font-semibold hover:bg-[#4169E1] hover:text-white transition cursor-pointer"
              >
                TECHNICIANS
              </Link>
            </div>
          </div>
        </div>

        {/* Right half */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#4169E1] text-white px-6 py-16">
          <div className="max-w-md space-y-10">
            <div>
              <h3 className="font-bold text-xl lg:text-2xl mb-2">INDIVIDUAL USERS</h3>
              <p>Can book one technician at a time. Best suited for home-based services.</p>
            </div>
            <div>
              <h3 className="font-bold text-xl lg:text-2xl mb-2">TECHNICIANS</h3>
              <p>Skilled professionals offering various repair or maintenance services.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
