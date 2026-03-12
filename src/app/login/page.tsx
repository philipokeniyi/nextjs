"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response.data.success) {
        toast.success("Login successful! Redirecting to home...");
        router.push("/profile");
      } else {
        toast.error(response.data.error || "Login failed. Please try again.");
      }
    } catch (error: any) {
      console.error(error.response?.data?.error || error.message);
      toast.error(
        error.response?.data?.error || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">
        {loading ? "Loading..." : "Log In"}
      </h1>

      <label htmlFor="email" className="w-full max-w-sm">
        Email
      </label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="w-full max-w-sm p-2 border border-gray-300 rounded"
        placeholder="email"
      />

      <label htmlFor="password" className="w-full max-w-sm">
        Password
      </label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="w-full max-w-sm p-2 border border-gray-300 rounded"
        placeholder="password"
      />

      <button
        onClick={onLogin}
        className="mt-4 px-6 py-3 bg-black text-white rounded-md hover:opacity-80 transition"
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "Fill all fields" : "Log In"}
      </button>

      <Link
        href="/signup"
        className="mt-4 text-sm text-gray-500 hover:underline"
      >
        Dont have an account? Sign up
      </Link>
    </div>
  );
}
