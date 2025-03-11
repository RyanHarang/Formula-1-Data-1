import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register as registerUser } from "../../store/authActions.js";
import LogoIcon from "../../assets/svg/profile/LogoIcon.jsx";
import EyeIcon from "../../assets/svg/profile/EyeIcon.jsx";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const onSubmit = async (data) => {
    dispatch(registerUser(data.email, data.password));
    navigate("/");
  };

  return (
    <div className="relative flex h-screen items-center justify-center">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://placehold.co/1593x1038"
        alt="Background"
      />
      <button
        className="bg-light-bg dark:bg-dark-bg hover:bg-light-bg2 dark:hover:bg-dark-bg3 absolute top-4 left-4 rounded p-2"
        onClick={() => navigate("/")}
      >
        Back
      </button>
      <div className="bg-light-bg/80 dark:bg-dark-bg/80 relative z-10 inline-flex w-[402px] flex-col items-center justify-center gap-4 rounded-2xl border p-6 backdrop-blur-sm">
        <LogoIcon />
        <div className="flex h-[69px] flex-col items-center justify-start gap-1 self-stretch text-center">
          <div className="font-['DM Sans'] text-center text-[34px] font-bold">
            Sign Up
          </div>
          <div className="font-['DM Sans'] self-stretch text-center text-base font-normal">
            Create a new account
          </div>
        </div>
        <form
          className="flex flex-col items-start justify-start gap-4 self-stretch"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="font-['Inter'] text-sm leading-tight font-medium">
            Email
          </label>
          <div className="bg-light-bg inline-flex items-center justify-start gap-2 self-stretch overflow-hidden rounded-lg border px-4 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
            <input
              type="email"
              className="text-light-fg shrink grow basis-0 font-['Inter'] text-base leading-normal font-normal"
              placeholder="Email"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
          <label className="font-['Inter'] text-sm leading-tight font-medium">
            Password
          </label>
          <div className="bg-light-bg inline-flex items-center justify-start gap-2 self-stretch overflow-hidden rounded-lg border px-4 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
            <input
              type={showPassword ? "text" : "password"}
              className="text-light-fg shrink grow basis-0 font-['Inter'] text-base leading-normal font-normal"
              placeholder="Password"
              {...register("password")}
            />
            <button
              data-svg-wrapper
              type="button"
              className="relative cursor-pointer hover:cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <EyeIcon />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
          <label className="font-['Inter'] text-sm leading-tight font-medium">
            Confirm Password
          </label>
          <div className="bg-light-bg inline-flex items-center justify-start gap-2 self-stretch overflow-hidden rounded-lg border px-4 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
            <input
              type={showPassword ? "text" : "password"}
              className="text-light-fg shrink grow basis-0 font-['Inter'] text-base leading-normal font-normal"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <button
              data-svg-wrapper
              type="button"
              className="relative cursor-pointer hover:cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <EyeIcon />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
          <Link
            className="font-['DM Sans'] center mt-2 flex text-xs font-normal hover:cursor-pointer"
            to="/login"
          >
            Already have an account?&nbsp; <u>Sign In</u>
          </Link>
          <button
            type="submit"
            className="hover:bg-dark-bg3 dark:hover:bg-light-bg2 bg-dark-bg dark:bg-light-bg flex h-12 w-full shrink grow basis-0 items-center justify-center gap-3 rounded-xl px-4 py-3 hover:cursor-pointer"
          >
            <div className="font-['DM Sans'] text-dark-fg dark:text-light-fg text-base font-medium">
              Sign Up
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
