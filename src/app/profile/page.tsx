"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  _id: string;
  username: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<User | null>(null);

  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      if (response.data.success) {
        toast.success("Logged out successfully! Redirecting to login...");
        router.push("/login");
      } else {
        toast.error(response.data.error || "Logout failed. Please try again.");
      }
    } catch (error: any) {
      console.error(error.response?.data?.error || error.message);
      toast.error(
        error.response?.data?.error || "Logout failed. Please try again.",
      );
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      if (response.data.success) {
        setData(response.data.user);
      } else {
        toast.error(response.data.error || "Failed to fetch user details.");
      }
    } catch (error: any) {
      console.error(error.response?.data?.error || error.message);
      toast.error(
        error.response?.data?.error || "Failed to fetch user details.",
      );
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-4xl font-bold">Profile Page</h1>
      <p className="text-lg">This is the profile page.</p>
      <h2 className="text-2xl font-semibold ">
        {!data ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data._id}`}>{data.username}</Link>
        )}
      </h2>

      <hr className="my-6 w-full max-w-md" />

      <button
        onClick={onLogout}
        className="bg-black text-white px-4 py-2 rounded hover:opacity-80 transition"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-black text-white px-4 py-2 rounded hover:opacity-80 transition"
      >
        get data
      </button>
    </div>
  );
}
