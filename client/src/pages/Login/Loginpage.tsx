import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import type { LoginFormData } from "../../types/types";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEyeClick = (): void => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Form Submitted", formData);
  };

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      <div className="hidden lg:block absolute right-0 w-[55%] h-full">
        <div className="absolute inset-0 bg-[#FF5454]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/loginpagetools.png"
            alt="Tools"
            className="w-[90%] h-[90%] object-contain"
          />
        </div>
      </div>
      <div className="relative w-full min-h-screen bg-white lg:bg-transparent lg:w-[45%] flex items-center">
        <div className="w-full max-w-[500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 lg:mb-16">
            <div className="flex items-baseline">
              <h1 className="font-inter text-2xl sm:text-[28px] lg:text-[45px] font-normal leading-normal lg:leading-[54px]">
                Login to
              </h1>
              <span className="font-poppins text-3xl sm:text-[36px] lg:text-[55px] font-medium leading-normal lg:leading-[82px] ml-2">
                Tech<span className="text-[#FF5454] italic">Ez</span>
              </span>
            </div>
          </div>
          <form
            className="space-y-6 sm:space-y-8 lg:space-y-[60px]"
            onSubmit={handleSubmit}>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <MdEmail className="w-5 h-4 sm:w-6 sm:h-5 text-[#818181]" />
                <label className="font-inter text-base sm:text-lg lg:text-[22px] font-semibold text-[#818181]">
                  Email<span className="text-[#FF5454]">*</span>
                </label>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b-2 sm:border-b-[3px] border-black pb-1 sm:pb-2 focus:outline-none font-inter text-sm sm:text-base lg:text-xl"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <RiLockPasswordLine className="w-5 h-4 sm:w-6 sm:h-5 text-[#818181]" />
                <label className="font-inter text-base sm:text-lg lg:text-[22px] font-semibold text-[#818181]">
                  Password<span className="text-[#FF5454]">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b-2 sm:border-b-[3px] border-black pb-1 sm:pb-2 focus:outline-none pr-8 sm:pr-10 font-inter text-sm sm:text-base lg:text-xl"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.password}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleEyeClick}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#FF5454] cursor-pointer">
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="w-5 h-4 sm:w-6 sm:h-5" />
                  ) : (
                    <AiOutlineEye className="w-5 h-4 sm:w-6 sm:h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 border border-black"
                />
                <label
                  htmlFor="remember"
                  className="font-inter text-xs sm:text-sm lg:text-base font-light">
                  Remember Me
                </label>
              </div>
              <button
                type="button"
                className="font-inter text-xs sm:text-sm lg:text-base font-light border-b border-black cursor-pointer">
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full h-[38px] sm:h-[44px] lg:h-[50px] bg-gradient-to-b from-[#FF5454] to-[#993232] text-white font-inter text-lg sm:text-2xl lg:text-[34px] font-semibold cursor-pointer">
              LOGIN
            </button>
            <div className="text-center">
              <span className="font-inter text-sm sm:text-base lg:text-lg font-medium">
                Don't have an account?{" "}
              </span>
              <Link
                to="/auth/signup"
                className="font-inter text-base sm:text-lg lg:text-xl font-bold text-[#FF5454] border-b border-[#FF5454]">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
