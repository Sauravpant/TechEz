import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { LoaderIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import type { LoginFormData } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { loginFailed, loginRequest, loginSuccess } from "../../features/auth/authSlice";
import type { RootState } from "../../store/store";

const LoginForm: React.FC<React.ComponentProps<"form">> = ({ className }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.auth.loading);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      dispatch(loginRequest());
      const response = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      const result = response.data.data;
      dispatch(loginSuccess(result));
      toast.success(result.message);
      switch (result.role) {
        case "admin":
          navigate("/admin");
          break;
        case "individual":
          navigate("/individual");
          break;
        case "technician":
          navigate("/technician");
          break;
        case "business":
          navigate("/business");
          break;
        default:
          navigate("/unauthorized");
      }
    } catch (err: any) {
      dispatch(loginFailed());
      toast.error(err.response.data.message);
    }
  };
  return (
    <form className={cn("flex flex-col gap-8 w-full", className)} method="post" onSubmit={handleSubmit}>
      <div className="flex flex-col items-start gap-2 text-left">
        <div className="mb-8">
          <div className="flex items-baseline">
            <h1 className="font-inter text-2xl sm:text-3xl lg:text-4xl font-normal leading-normal lg:leading-[54px]">Login to</h1>
            <span className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold leading-normal lg:leading-[82px] ml-2">
              Tech<span className="text-[#4169E1] italic">Ez</span>
            </span>
          </div>
        </div>
      </div>
      <div className="grid gap-6 w-full">
        <div className="grid gap-3">
          <Label htmlFor="email" className="text-base font-medium">
            Email<span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="pl-10 text-base border-b-2 border-black rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-[#4169E1]"
            />
            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password" className="text-base font-medium">
            Password<span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleInputChange}
              className="pl-10 pr-10 text-base border-b-2 border-black rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-[#4169E1]"
            />
            <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <div onClick={() => setShowPassword((prev) => !prev)} className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
        </div>
        <div className="flex items-center justify-between w-full mt-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="accent-[#4169E1]" />
            <Label htmlFor="remember" className="text-sm">
              Remember Me
            </Label>
          </div>
          <a href="#" className="text-sm text-black hover:underline">
            Forgot Password?
          </a>
        </div>
        <Button type="submit" className="w-full bg-[#4169E1] text-lg font-semibold py-2 mt-2 cursor-pointer">
          {loading ? <LoaderIcon className="animate-spin" /> : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm mt-4">
        Don&apos;t have an account?{" "}
        <Link to="/auth/signup/verify-email" className="text-[#4169E1] font-medium hover:underline">
          Register
        </Link>
      </div>
    </form>
  );
};

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white min-h-screen p-0">
        <div className="w-full max-w-md px-8">
          <LoginForm />
        </div>
      </div>
      <div className="hidden lg:flex w-1/2 h-screen bg-[#4169E1] items-center justify-center relative">
        <img src="/loginpagetools.png" alt="Tools" className="object-contain h-[70%] w-[90%] mx-auto" />
      </div>
    </div>
  );
};

export default LoginPage;
