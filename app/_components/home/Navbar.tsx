import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import User from "../Helper/User";

const Navbar = async () => {
	const session = await auth();
	// console.log(session); // dispalys user info
	return (
		<div className="h-[13vh] overflow-hidden shadow-md">
			<div className="w-[90%] md:w-[80%] h-[100%] mx-auto flex items-center justify-between">
				{/* Logo */}
				<div className="w-[45px] h-[45px]">
					<Link href="/">
						<Image
							src="/job-logo.png"
							width={50}
							height={50}
							alt="site logo"
							className="w-[100%] h-[100%]"
						/>
					</Link>
				</div>
				<div className="flex items-center space-x-4">
					{!session && (
						<Link href="/signup">
							<button className="px-4 py-1.5 text-[14px] sm:text-[16px] sm:px-6 sm:py-2 bg-slate-500 font-semibold text-white rounded-lg hover:bg-slate-600 transition-all duration-300">
								Sign Up
							</button>
						</Link>
					)}
					{session && <User session={session} />}
					{session && (
						<button className="px-4 py-1.5 text-[14px] sm:text-[16px] sm:px-6 sm:py-2 bg-emerald-600 font-semibold text-white rounded-lg hover:bg-emerald-500 transition-all duration-300">
							Post a Job
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
