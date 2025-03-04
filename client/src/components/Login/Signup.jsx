import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import LogoIcon from "../../assets/svg/profile/LogoIcon.jsx";
import EyeIcon from "../../assets/svg/profile/EyeIcon.jsx";

// Zod schema for validation
const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      {/* background img */}
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://placehold.co/1593x1038"
        alt="Background"
      />
      {/* back button */}
      <button
        className="absolute top-4 left-4 rounded bg-black p-2 text-white hover:bg-gray-800"
        onClick={() => navigate("/")}
      >
        Back
      </button>
      {/* overlay */}
      <div className="relative z-10 inline-flex w-[402px] flex-col items-center justify-center gap-6 rounded-2xl border border-white bg-white/80 p-6 backdrop-blur-sm">
        {/* logo */}
        <LogoIcon />

        <div className="mb-4 flex flex-col items-center justify-start gap-1 self-stretch text-center">
          <div className="font-['DM Sans'] text-center text-[34px] font-bold text-black">
            Sign Up
          </div>
          <div className="font-['DM Sans'] self-stretch text-center text-base font-normal text-[#110c2a]">
            Create a new account
          </div>
        </div>
        <form
          className="flex flex-col items-start justify-start gap-4 self-stretch"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-start justify-start self-stretch">
            <div className="flex flex-col items-start justify-start gap-1.5 self-stretch">
              <label className="font-['Inter'] text-sm leading-tight font-medium text-[#344053]">
                Email
              </label>
              <div className="inline-flex items-center justify-start gap-2 self-stretch overflow-hidden rounded-lg border border-[#cfd4dc] bg-white px-4 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <input
                  type="email"
                  className="shrink grow basis-0 font-['Inter'] text-base leading-normal font-normal text-[#667084]"
                  placeholder="Email"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1.5 self-stretch">
            <label className="font-['Inter'] text-sm leading-tight font-medium text-[#344053]">
              Password
            </label>
            <div className="inline-flex items-center justify-start gap-2 self-stretch overflow-hidden rounded-lg border border-[#cfd4dc] bg-white px-4 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
              <input
                type={showPassword ? "text" : "password"}
                className="shrink grow basis-0 font-['Inter'] text-base leading-normal font-normal text-[#667084]"
                placeholder="Password"
                {...register("password")}
              />
              <div
                data-svg-wrapper
                className="relative cursor-pointer hover:cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <EyeIcon />
              </div>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start justify-start gap-1.5 self-stretch">
            <label className="font-['Inter'] text-sm leading-tight font-medium text-[#344053]">
              Confirm Password
            </label>
            <div className="inline-flex items-center justify-start gap-2 self-stretch overflow-hidden rounded-lg border border-[#cfd4dc] bg-white px-4 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
              <input
                type={showPassword ? "text" : "password"}
                className="shrink grow basis-0 font-['Inter'] text-base leading-normal font-normal text-[#667084]"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              <div
                data-svg-wrapper
                className="relative cursor-pointer hover:cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <EyeIcon />
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Link
            className="font-['DM Sans'] center mt-2 flex text-xs font-normal text-black hover:cursor-pointer"
            to="/login"
          >
            Already have an account? Login
          </Link>
          <button
            type="submit"
            className="mt-4 flex h-12 items-center justify-center gap-3 self-stretch rounded-xl bg-black px-4 py-3 hover:cursor-pointer hover:bg-[#1a1a1a]"
          >
            <div className="font-['DM Sans'] text-base font-medium text-white">
              Sign Up
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
