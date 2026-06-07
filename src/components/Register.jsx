"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { supabase } from "@/Config/Supabase";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff, FiX } from "react-icons/fi";

export function Register({ isOpen, onClose, onSwitchToLogin }) {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .matches(/[A-Z]/, "Must contain an uppercase letter")
      .matches(/[0-9]/, "Must contain a number")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Please confirm your password"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      setLoading(false);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created! Check your email.");
        formik.resetForm();
        onClose();
      }
    },
  });

  const signInWithGoogle = async () => {
    setGoogleLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "http://localhost:3000" },
    });
    if (error) {
      setGoogleLoading(false);
      toast.error(error.message);
    }
    console.log(data, error);
  };

  // Don't render if closed
  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose} // click backdrop to close
    >
      {/* Modal Box — stop propagation so clicking inside doesn't close */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <FiX size={22} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://www.dvago.pk/assets/dvago-logo.svg"
            alt="DVAGO"
            className="h-9"
          />
        </div>

        <h1 className="text-2xl font-black text-gray-800 mb-1">
          Create an account
        </h1>
        <p className="text-sm text-gray-400 mb-5">
          Join DVAGO — Pakistan's trusted pharmacy
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="reg-email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              id="reg-email"
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
            <label
              htmlFor="reg-password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="reg-password"
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
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="reg-confirm"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                id="reg-confirm"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm outline-none transition ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 bg-gray-50 focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              id="reg-terms"
              name="terms"
              type="checkbox"
              checked={formik.values.terms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-0.5 w-4 h-4 accent-lime-500 cursor-pointer"
            />
            <label
              htmlFor="reg-terms"
              className="text-sm text-gray-500 cursor-pointer"
            >
              I agree to the{" "}
              <span className="text-lime-600 font-semibold hover:underline">
                Terms & Conditions
              </span>
            </label>
          </div>
          {formik.touched.terms && formik.errors.terms && (
            <p className="text-red-500 text-xs">{formik.errors.terms}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-500 hover:bg-lime-600 disabled:opacity-60 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Create Account"
            )}
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
            {googleLoading ? (
              <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <FcGoogle size={20} /> Sign up with Google
              </>
            )}
          </button>
        </form>

        {/* Switch to Login */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-lime-600 font-bold hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
