import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setLoading, sendOtpSuccess, sendOtpFailure } from "../../features/auth/verificationSlice";
import { axiosInstance } from "../../lib/axios";

const VerifyEmail: React.FC = () => {
  const [emailLocal, setEmailLocal] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEmailSent = useSelector((state: RootState) => state.verification.isEmailSent);
  const validateEmail = (value: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return "Email is required";
    if (!emailRegex.test(value)) return "Invalid email format";
    return "";
  };

  useEffect(() => {
    if (isEmailSent) {
      navigate("/auth/signup/verify-otp");
    }
  }, [isEmailSent, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailLocal(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validateEmail(emailLocal);
    if (err) {
      setError(err);
      return;
    }

    dispatch(setLoading(true));
    dispatch(setEmail(emailLocal));

    try {
      await axiosInstance.post("/auth/request-otp", { email: emailLocal });
      dispatch(sendOtpSuccess());
      navigate("/auth/signup/verify-otp");
    } catch (error) {
      dispatch(sendOtpFailure());
      setError("Failed to send OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white min-h-screen p-0">
        <div className="w-full max-w-md px-8">
          <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start gap-2 text-left mb-8">
              <div className="flex items-baseline">
                <h1 className="font-inter text-2xl sm:text-3xl lg:text-4xl font-normal">Verify Your Email First</h1>
              </div>
              <span className="text-lg text-gray-600 mt-2">Enter your email to receive a verification code</span>
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
                    value={emailLocal}
                    onChange={handleChange}
                    className="pl-10 text-base border-b-2 border-black rounded-none bg-transparent focus:outline-none focus:ring-0 focus:border-[#4169E1]"
                  />
                  <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#4169E1] text-lg font-semibold py-2 mt-2 cursor-pointer">
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex w-1/2 h-screen bg-[#4169E1] items-center justify-center relative">
        <img src="/loginpagetools.png" alt="Tools" className="object-contain h-[70%] w-[90%] mx-auto" />
      </div>
    </div>
  );
};

export default VerifyEmail;
