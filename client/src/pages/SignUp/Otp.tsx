import { useRef, useState,useEffect } from "react";
import type { ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, verifyOtpSuccess, verifyOtpFailure } from "../../features/auth/verificationSlice";
import { axiosInstance } from "../../lib/axios";
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Otp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.verification.email);
  const navigate=useNavigate();
  const isOtpVerified = useSelector((state: RootState) => state.verification.isOtpVerified)

  useEffect(() => {
    if (!email) {
      navigate('auth/signup/verify-email'); 
    }
    if (isOtpVerified) {
      navigate('/auth/signup');
    }
  }, [email, isOtpVerified, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    setError("");
    if (value && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };
  const userEmail = useSelector((state:RootState) => state.verification.email);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.some((digit) => digit === "")) {
      setError("Please enter the 6-digit code");
      return;
    }
    dispatch(setLoading(true));
    const otpCode = otp.join("");

    try {
      await axiosInstance.post("/auth/verify-otp", { email, otp: otpCode });
      dispatch(verifyOtpSuccess());
      
    } catch (error) {
      dispatch(verifyOtpFailure());
      setError("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white min-h-screen p-0">
        <div className="w-full max-w-md px-8">
          <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start gap-2 text-left mb-8">
              <div className="flex items-baseline">
                <h1 className="font-inter text-2xl sm:text-3xl lg:text-4xl font-normal">Enter OTP for</h1>
                <span className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold ml-2">
                  Tech<span className="text-[#4169E1] italic">Ez</span>
                </span>
              </div>
              <span className="text-lg text-gray-600 mt-2">An email with 6 digit verification code has been sent to {userEmail}. Please enter the code to continue. </span>
            </div>
            <div className="flex flex-col gap-6 w-full">
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <Input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    ref={(el) => {
                      inputsRef.current[idx] = el;
                    }}
                    className="w-12 h-14 text-center text-2xl border-2 border-black rounded-lg focus:border-[#4169E1] focus:ring-0 bg-transparent"
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-[#4169E1] text-lg font-semibold py-2 mt-2 cursor-pointer">
                Submit
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

export default Otp;
