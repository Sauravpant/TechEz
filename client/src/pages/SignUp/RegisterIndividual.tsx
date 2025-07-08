import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import type { IndividualRegisterFormData } from "../../types/types";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

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

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left: Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white min-h-screen p-0">
        <div className="w-full max-w-lg px-4 sm:px-8">
          <div className="flex items-center gap-3 mb-8 mt-8">
            <span className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold leading-normal">
              Tech<span className="text-[#4169E1] italic">Ez</span>
            </span>
            <div className="w-[2px] h-8 sm:h-10 bg-black mx-2" />
            <span className="font-inter text-lg sm:text-xl font-light">Individual User</span>
          </div>
          <div className="bg-white border border-black rounded-2xl shadow-md px-6 py-8 sm:px-10 sm:py-10 w-full">
            <div className="flex items-center mb-6">
              <button type="button" className="text-[#4169E1] text-2xl mr-2">
                &#8592;
              </button>
              <h1 className="flex-1 text-center text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide">REGISTRATION</h1>
            </div>
            <hr className="border-black mb-6" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Eg. Samir Shrestha"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full border-black rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-[#4169E1] ${errors.fullName ? "border-red-500" : ""}`}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block font-medium mb-1">E-mail</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Eg. abcd@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border-black rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-[#4169E1] ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="relative">
                <label className="block font-medium mb-1">Password</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=""
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full border-black rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-[#4169E1] pr-10 ${errors.password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-[#4169E1]"
                  tabIndex={-1}
                >
                  {showPassword ? <AiOutlineEyeInvisible className="w-5 h-5" /> : <AiOutlineEye className="w-5 h-5" />}
                </button>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <div className="relative">
                <label className="block font-medium mb-1">Confirm Password</label>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder=""
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full border-black rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-[#4169E1] pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-[#4169E1]"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible className="w-5 h-5" /> : <AiOutlineEye className="w-5 h-5" />}
                </button>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="accent-[#4169E1] w-4 h-4"
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the <span className="text-[#4169E1] underline cursor-pointer">Terms & Conditions.</span>
                </label>
              </div>
              {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
              <Button type="submit" className="w-full bg-[#4169E1] text-lg font-semibold py-2 mt-2">
                SUBMIT
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex w-1/2 h-screen bg-[#4169E1] items-center justify-center relative">
        <img src="/user.png" alt="Technician" className="object-contain h-[70%] w-[90%] mx-auto" />
      </div>
    </div>
  );
};

export default RegisterIndividual;
