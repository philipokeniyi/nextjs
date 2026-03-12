"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      if (response.data.success) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(response.data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.log("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">
        {loading ? "Creating Account..." : "Sign Up"}
      </h1>
      <label htmlFor="username" className="w-full max-w-sm">
        Username
      </label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="w-full max-w-sm p-2 border border-gray-300 rounded"
        placeholder="username"
      />

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
        onClick={onSignup}
        className="mt-4 px-6 py-3 bg-black text-white rounded-md hover:opacity-80 transition"
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "Fill all fields" : "Sign Up"}
      </button>

      <Link
        href="/login"
        className="mt-4 text-sm text-gray-500 hover:underline"
      >
        Already have an account? Log in
      </Link>
    </div>
  );
}
