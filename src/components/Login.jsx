"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { supabase } from "@/Config/Supabase";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff, FiX } from "react-icons/fi";

export function Login({ isOpen, onClose, onSwitchToRegister }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    password: Yup.string().min(8, "Minimum 8 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "", remember: false },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      setLoading(false);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Welcome back!");
        formik.resetForm();
        onClose();
        router.push("/");
      }
    },
  });

  const signInWithGoogle = async () => {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "http://localhost:3000" },
    });
    if (error) {
      setGoogleLoading(false);
      toast.error(error.message);
    }
    console.log(error)
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
          <FiX size={22} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="https://www.dvago.pk/assets/dvago-logo.svg" alt="DVAGO" className="h-9" />
        </div>

        <h1 className="text-2xl font-black text-gray-800 mb-1">Welcome back</h1>
        <p className="text-sm text-gray-400 mb-5">Log in to your DVAGO account</p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label htmlFor="log-email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="log-email"
              name="email"
              type="email"
              placeholder="name@company.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition ${
                formik.touched.email && formik.errors.email
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 bg-gray-50 focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="log-password" className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <a href="#" className="text-xs text-lime-600 font-semibold hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                id="log-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm outline-none transition ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 bg-gray-50 focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
                }`}
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input id="remember" name="remember" type="checkbox"
              checked={formik.values.remember}
              onChange={formik.handleChange}
              className="w-4 h-4 accent-lime-500 cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer">
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-500 hover:bg-lime-600 disabled:opacity-60 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center"
          >
            {loading
              ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : "Log In"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={signInWithGoogle}
            disabled={googleLoading}
            className="w-full border border-gray-300 hover:bg-gray-50 disabled:opacity-60 text-gray-700 font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2 text-sm"
          >
            {googleLoading
              ? <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              : <><FcGoogle size={20} /> Sign in with Google</>}
          </button>

        </form>

        {/* Switch to Register */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-lime-600 font-bold hover:underline"
          >
            Sign up
          </button>
        </p>

      </div>
    </div>
  );
}