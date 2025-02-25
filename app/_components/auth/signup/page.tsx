"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Signup = () => {
	return (
		<div className="overflow-hidden h-[84vh] flex flex-col items-center justify-center">
			{/* Signup Image */}
			<Image src="/chair.jpg" width={400} height={200} alt="chair-image" />
			<button
				onClick={() =>
					signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_URL })
				}
				className="px-12 py-3 mt-[2rem] bg-purple-700 hover:bg-purple-800 transition-all duration-300 rounded-lg text-white"
			>
				Sign Up Now
			</button>
		</div>
	);
};

export default Signup;
