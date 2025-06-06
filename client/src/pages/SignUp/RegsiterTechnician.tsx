import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import type { TechnicianRegisterFormData } from "../../types/types";
import { Link } from "react-router-dom";

const RegisterTechnician: React.FC = () => {
  const [formData, setFormData] = useState<TechnicianRegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    registrationNumber: "",
    panCard: null,
    experience: "",
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      setFileName(files[0].name);
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!passwordRegex.test(formData.password))
      newErrors.password =
        "Password must be 8+ chars, with uppercase, lowercase, number, special char";
    if (!formData.registrationNumber.trim())
      newErrors.registrationNumber = "Registration number is required";
    if (!formData.panCard) newErrors.panCard = "Pan card is required";
    if (!formData.experience || parseInt(formData.experience) < 0)
      newErrors.experience = "Experience must be a positive number";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Form submitted:", formData);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="h-screen w-screen overflow-hidden bg-white flex flex-col lg:flex-row">
      <div className="h-full w-full lg:w-[45%] p-2 sm:p-4 lg:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
          <span className="font-poppins text-xl sm:text-3xl font-medium">
            Tech<span className="text-[#FF5454] italic">Ez</span>
          </span>
          <div className="w-0.5 sm:w-1 h-6 sm:h-8 bg-black"></div>
          <span className="text-base sm:text-lg font-extralight font-inter">
            Technicians
          </span>
        </div>

        <div className="max-w-[450px] mx-auto border border-black sm:border-2 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-center mb-2">
            REGISTRATION
          </h2>
          <div className="w-[150px] sm:w-[250px] h-0.5 bg-black mx-auto mb-3"></div>

          <form
            onSubmit={handleSubmit}
            className="space-y-2 sm:space-y-3 flex flex-col overflow-y-auto px-1"
            style={{ maxHeight: "calc(100vh - 230px)" }}>
            <div className="space-y-1">
              <label className="block text-sm lg:text-base font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                className="w-full h-8 sm:h-9 lg:h-10 border border-black sm:border-2 px-2 sm:px-3 placeholder-gray-400 rounded text-sm"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm lg:text-base font-medium">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                placeholder="abcd@gmail.com"
                className="w-full h-8 sm:h-9 lg:h-10 border border-black sm:border-2 px-2 sm:px-3 placeholder-gray-400 rounded text-sm"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm lg:text-base font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full h-8 sm:h-9 lg:h-10 border border-black sm:border-2 px-2 sm:px-3 rounded text-sm"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-[#FF5454] text-base">
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm lg:text-base font-medium">
                Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                placeholder="Eg. 000000000000000"
                className="w-full h-8 sm:h-9 lg:h-10 border border-black sm:border-2 px-2 sm:px-3 placeholder-gray-400 rounded text-sm"
                value={formData.registrationNumber}
                onChange={handleInputChange}
              />
              {errors.registrationNumber && (
                <p className="text-red-500 text-xs">
                  {errors.registrationNumber}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm lg:text-base font-medium">
                Pan Card
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="panCard"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                  id="panCard"
                />
                <label
                  htmlFor="panCard"
                  className="flex items-center w-full h-8 sm:h-9 lg:h-10 border border-black sm:border-2 rounded text-sm overflow-hidden">
                  <span className="bg-[#FF5454] text-white px-3 h-full flex items-center">
                    Choose File
                  </span>
                  <span className="px-2 sm:px-3 truncate text-gray-500">
                    {fileName || "No file chosen"}
                  </span>
                </label>
              </div>
              {errors.panCard && (
                <p className="text-red-500 text-xs">{errors.panCard}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm lg:text-base font-medium">
                Experience
              </label>
              <input
                type="number"
                name="experience"
                placeholder="Eg. 1"
                className="w-full h-8 sm:h-9 lg:h-10 border border-black sm:border-2 px-2 sm:px-3 placeholder-gray-400 rounded text-sm"
                value={formData.experience}
                onChange={handleInputChange}
              />
              {errors.experience && (
                <p className="text-red-500 text-xs">{errors.experience}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="termsAccepted"
                className="w-4 h-4 sm:w-5 sm:h-5 border border-black rounded cursor-pointer"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
              />
              <label className="text-xs sm:text-sm">
                I agree to{" "}
                <Link to="" className="text-red-400">
                  Terms and Conditions
                </Link>
              </label>
              {errors.termsAccepted && (
                <p className="text-red-500 text-xs">{errors.termsAccepted}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-[#FF5454] text-white font-bold text-sm px-4 sm:px-6 py-2 rounded hover:bg-[#ff3a3a] transition-colors cursor-pointer mt-2">
              SUBMIT
            </button>
          </form>
        </div>
      </div>

      <div className="hidden lg:block lg:w-[55%] relative">
        <div className="absolute inset-0">
          <img
            src="/curvepath.png"
            alt="Background Shape"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute left-[10%] top-[8%] w-[60%] h-[65%]">
          <img
            src="/technician.png"
            alt="Technician"
            className="w-full h-full object-contain object-left-bottom drop-shadow-[0px_28px_26.1px_rgba(0,0,0,0.25)]"
            style={{ transform: "translateX(32px) translateY(32px)" }}
          />
        </div>
      </div>
    </div>
  );
};
export default RegisterTechnician;
