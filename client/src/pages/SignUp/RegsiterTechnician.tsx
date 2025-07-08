import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import type { TechnicianRegisterFormData } from "../../types/types";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

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
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setFileName(files[0].name);
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
    if (!passwordRegex.test(formData.password)) newErrors.password = "Password must be 8+ chars, with uppercase, lowercase, number, special char";
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration number is required";
    if (!formData.panCard) newErrors.panCard = "Pan card is required";
    if (!formData.experience || parseInt(formData.experience) < 0) newErrors.experience = "Experience must be a positive number";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms";
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left: Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white min-h-screen p-0">
        <div className="w-full max-w-lg px-4 sm:px-8">
          <div className="flex items-center gap-3 mb-8 mt-8">
            <span className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold leading-normal">
              Tech<span className="text-[#4169E1] italic">Ez</span>
            </span>
            <div className="w-[2px] h-8 sm:h-10 bg-black mx-2" />
            <span className="font-inter text-lg sm:text-xl font-light">Technicians</span>
          </div>
          <div className="bg-white border border-black rounded-2xl shadow-md px-6 py-8 sm:px-10 sm:py-10 w-full">
            <div className="flex items-center mb-6">
              <h1 className="flex-1 text-center text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide">REGISTRATION</h1>
            </div>
            <hr className="border-black mb-6" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Eg. Swastika Dhakal"
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
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-9 text-gray-500 hover:text-[#4169E1]"
                  tabIndex={-1}
                >
                  {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="block font-medium mb-1">Registration Number</label>
                <Input
                  type="text"
                  name="registrationNumber"
                  placeholder="Eg. 000000000000000"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className={`w-full border-black rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-[#4169E1] ${errors.registrationNumber ? "border-red-500" : ""}`}
                />
                {errors.registrationNumber && <p className="text-red-500 text-sm mt-1">{errors.registrationNumber}</p>}
              </div>
              <div>
                <label className="block font-medium mb-1">Pan Card</label>
                <div className="relative">
                  <input type="file" name="panCard" accept="image/*" onChange={handleInputChange} className="hidden" id="panCard" />
                  <label
                    htmlFor="panCard"
                    className="flex items-center w-full h-10 border border-black rounded text-sm overflow-hidden cursor-pointer"
                  >
                    <span className="bg-[#4169E1] text-white px-3 h-full flex items-center">Choose File</span>
                    <span className="px-2 sm:px-3 truncate text-gray-500">{fileName || "No file chosen"}</span>
                  </label>
                </div>
                {errors.panCard && <p className="text-red-500 text-sm mt-1">{errors.panCard}</p>}
              </div>
              <div>
                <label className="block font-medium mb-1">Experience</label>
                <Input
                  type="number"
                  name="experience"
                  placeholder="Eg. 1"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className={`w-full border-black rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-[#4169E1] ${errors.experience ? "border-red-500" : ""}`}
                />
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  className="accent-[#4169E1] w-4 h-4"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                />
                <label className="text-sm">
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
      {/* Right: Image */}
      <div className="hidden lg:flex w-1/2 h-screen bg-[#4169E1] items-center justify-center relative">
        <img src="/technician.png" alt="Technician" className="object-contain h-[70%] w-[90%] mx-auto" />
      </div>
    </div>
  );
};

export default RegisterTechnician;
