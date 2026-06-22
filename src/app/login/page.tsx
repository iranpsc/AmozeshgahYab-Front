"use client";

import { useState } from "react";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");

      await loginUser(
        username.trim(),
        password
      );

      router.replace("/dashboard");
    } catch (error) {
      console.error(error);

      setError(
        "نام کاربری یا رمز عبور اشتباه است"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc]">

      {/* Header */}
      <div className="absolute top-10 left-1/2 z-20 -translate-x-1/2">
        <h1 className="text-center text-xl lg:text-2xl md:text-4xl font-bold text-[#0d4b87]">
          amozeshgahyab.ir - سامانه آموزشگاه یاب
        </h1>
      </div>

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/login-bg.jpg"
          alt="background"
          fill
          priority
          className="object-cover object-left"
        />
      </div>

      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

      {/* Login Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 mt-16 lg:mt-0">
        <div className="w-full max-w-[430px] rounded-2xl bg-white p-8 shadow-2xl text-black">

          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={70}
              height={70}
            />
          </div>

          {/* Title */}
          <h2 className="mb-8 text-center text-4xl font-bold">
            ورود به پنل
          </h2>

          {/* Username */}
          <div className="mb-5">
            <label className="mb-2 block text-right text-lg font-semibold">
              نام کاربری
            </label>

            <input
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              type="text"
              autoComplete="username"
              placeholder="نام کاربری"
              className="
                h-14
                w-full
                rounded-lg
                border
                border-gray-300
                bg-[#eef3fb]
                px-4
                text-right
                outline-none
                focus:border-[#0d65c9]
              "
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="mb-2 block text-right text-lg font-semibold">
              رمز عبور
            </label>

            <div className="relative">
              <input
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="current-password"
                placeholder="رمز عبور"
                className="
                  h-14
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  bg-[#eef3fb]
                  px-4
                  text-right
                  outline-none
                  focus:border-[#0d65c9]
                "
              />

              <button
                type="button"
                aria-label="Show Pass"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-xl
                  text-gray-600
                  w-5
                  cursor-pointer
                "
              >
                {showPassword ? (
                  <FiEye className="size-5 cursor-pointer" />
                ) : (
                  <FiEyeOff className="size-5 cursor-pointer"/>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="
                mb-4
                rounded-lg
                bg-red-50
                p-3
                text-center
                text-sm
                text-red-600
              "
            >
              {error}
            </div>
          )}

          {/* Button */}
          <button
          aria-label="sumbit btn"
            onClick={handleLogin}
            disabled={
              loading ||
              !username ||
              !password
            }
            className="
              h-14
              w-full
              rounded-lg
              bg-[#0d65c9]
              text-xl
              font-bold
              text-white
              transition
              hover:bg-[#0b56ab]
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "در حال ورود..."
              : "ورود"}
          </button>

          {/* Forgot */}
          {/* <button
            type="button"
            className="
              mt-4
              w-full
              text-lg
              font-semibold
              text-[#0d4b87]
            "
          >
            فراموشی رمز عبور؟
          </button> */}

          {/* Footer */}
          <p className="mt-6 text-center text-base leading-8 text-gray-700">
            این سامانه با استفاده از دامنه amozeshgahyab.ir برای آموزشگاه ها ایجاد شده است

          </p>
        </div>
      </div>
    </main>
  );
}