import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import type { IndividualRegisterFormData } from "../../types/types";

const RegisterIndividual = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<IndividualRegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

    if (!formData.fullName.trim() ) newErrors.fullName = "Full name is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
    if (!passwordRegex.test(formData.password)) newErrors.password = "Password must be 8+ chars, with uppercase, lowercase, number, special char";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeToTerms) newErrors.termsAccepted = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log(formData);
  };

  return (
    <div className="min-h-screen w-full bg-white overflow-hidden">
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-50 flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="font-poppins text-xl sm:text-2xl font-medium">
            Tech<span className="text-[#FF5454] italic">Ez</span>
          </span>
          <div className="w-[1px] h-6 bg-gray-300" />
          <span className="font-inter text-base sm:text-lg font-extralight">Individual User</span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        <div className="w-full lg:w-[45%] flex flex-col lg:justify-center pt-16 lg:pt-0 px-4 sm:px-6 lg:px-12">
          <div className="hidden lg:flex items-center gap-3 mb-8">
            <span className="font-poppins text-[50px] font-medium leading-[75px]">
              Tech<span className="text-[#FF5454]">Ez</span>
            </span>
            <div className="w-[2px] h-[50px] bg-black" />
            <span className="font-inter text-[25px] font-extralight leading-[30px]">Individual User</span>
          </div>
          <div className="w-full max-w-[500px] mx-auto">
            <div className="text-center mb-6 lg:mb-10">
              <h1 className="font-inter text-xl sm:text-2xl lg:text-[40px] font-semibold tracking-wide">REGISTRATION</h1>
              <div className="w-24 sm:w-32 lg:w-48 h-0.5 lg:h-1 bg-[#FF5454] mx-auto mt-2 lg:mt-3" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 lg:space-y-8">
              <div className="space-y-2">
                <label className="block font-inter text-sm sm:text-base lg:text-lg font-medium text-gray-800">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full h-10 sm:h-11 lg:h-12 px-3 lg:px-4 border-2 ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-1 focus:ring-[#FF5454] transition-colors duration-200 font-inter text-sm sm:text-base placeholder:text-gray-400`}
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <label className="block font-inter text-sm sm:text-base lg:text-lg font-medium text-gray-800">E-mail</label>
                <input
                  type="email"
                  name="email"
                  placeholder="abcd@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full h-10 sm:h-11 lg:h-12 px-3 lg:px-4 border-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-1 focus:ring-[#FF5454] transition-colors duration-200 font-inter text-sm sm:text-base placeholder:text-gray-400`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label className="block font-inter text-sm sm:text-base lg:text-lg font-medium text-gray-800">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full h-10 sm:h-11 lg:h-12 px-3 lg:px-4 pr-10 border-2 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-1 focus:ring-[#FF5454] transition-colors duration-200 font-inter text-sm sm:text-base`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF5454] transition-colors duration-200"
                  >
                    {showPassword ? <AiOutlineEyeInvisible className="w-5 h-5" /> : <AiOutlineEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <label className="block font-inter text-sm sm:text-base lg:text-lg font-medium text-gray-800">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full h-10 sm:h-11 lg:h-12 px-3 lg:px-4 pr-10 border-2 ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-1 focus:ring-[#FF5454] transition-colors duration-200 font-inter text-sm sm:text-base`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF5454] transition-colors duration-200"
                  >
                    {showConfirmPassword ? <AiOutlineEyeInvisible className="w-5 h-5" /> : <AiOutlineEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 rounded border-2 border-gray-300 text-[#FF5454] focus:ring-[#FF5454] transition-colors duration-200"
                />
                <label htmlFor="terms" className="font-inter text-sm sm:text-base text-gray-600">
                  I agree to the{" "}
                  <span className="text-[#FF5454] font-medium hover:text-[#cc4444] cursor-pointer transition-colors duration-200">
                    Terms & Conditions
                  </span>
                </label>
              </div>
              {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 h-11 sm:h-12 bg-[#FF5454] hover:bg-[#cc4444] text-white font-inter text-base sm:text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:block lg:w-[55%] relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0">
              <img src="/curvepath.png" alt="Background Shape" className="w-full h-full object-cover" />
            </div>
            <div className="absolute left-[10%] top-[8%] w-[60%] h-[80%]">
              <img
                src="/user.png"
                alt="Technician"
                className="w-full h-full object-contain object-left-bottom filter drop-shadow-[0px_28px_26.1px_rgba(0,0,0,0.25)]"
                style={{
                  transform: "translateX(42px) translateY(83px)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterIndividual;
