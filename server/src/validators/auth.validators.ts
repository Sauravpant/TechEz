import z from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name must be at most 50 characters long"),
  email: z.email({ pattern: z.regexes.email, error: "Invalid email address" }),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 digits")
    .max(50, "Password is too long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,15}$/, "Password must include uppercase, lowercase, number, and special character"),
});

export const registerTechnicianSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name must be at most 50 characters long"),
  email: z.email({ pattern: z.regexes.email, error: "Invalid email address" }),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 digits")
    .max(50, "Password is too long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,15}$/, "Password must include uppercase, lowercase, number, and special character"),
  experience: z.coerce.number().min(0, "Experience must be at least 0 years").max(50, "Experience must be at most 50 years"),
  registrationNumber: z
    .string()
    .min(10, "Registration Number must be at least 10 characters long")
    .max(10, "Registration Number must be at most 10 characters long")
    .optional(),
  category: z.string().min(2, "Category must be at least 2 characters long").max(50, "Category must be at most 50 characters long"),
  bio: z.string().min(10, "Bio must be at least 10 characters long").max(100, "Bio must be at most 300 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long").max(500, "Description must be at most 500 characters long"),
});

export const LoginSchema = z.object({
  email: z.email({ pattern: z.regexes.email, error: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password must be atleast 8 digits")
    .max(50, "Password is too long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,15}$/, "Password must include uppercase, lowercase, number, and special character"),
});

export const sendOtpSchema = z.object({
  email: z.email({ pattern: z.regexes.email, error: "Invalid email address" }),
});
export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(8, "Password must be atleast 8 digits")
    .max(50, "Password is too long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,15}$/, "Password must include uppercase, lowercase, number, and special character"),
  newPassword: z
    .string()
    .min(8, "Password must be atleast 8 digits")
    .max(50, "Password is too long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,15}$/, "Password must include uppercase, lowercase, number, and special character"),
});

export const forgotPasswordSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
  newPassword: z
    .string()
    .min(8, "Password must be 8 digits")
    .max(15, "Paassword can be at most 15 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  confirmNewPassword: z
    .string()
    .min(8, "Password must be 8 digits")
    .max(15, "Paassword can be at most 15 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  otp: z.string().max(6, "OTP must be of 6 digits").min(6, "OTP must be of 6 digits"),
});
