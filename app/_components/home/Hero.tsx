import Image from "next/image";
import React from "react";

const Hero = () => {
	return (
		<div className="pt-[5rem] pb-[3rem] w-[80%] mx-auto ">
			<div className=" h-[60vh] w-full">
				<div className="flex items-center w-[100%] gap-[1rem]">
					{/* content */}
					<div className="mr-10">
						<h1 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.7rem] font-bold text-slate-900 mb-3">
							The{" "}
							<span className="bg-gradient-to-tr from-blue-700 via-purple-800 to-pink-500 text-clip bg-clip-text text-transparent font-extrabold">
								Easiest Way
							</span>{" "}
							<br /> To Get Your Dream Job
						</h1>
						<p className="text-[#333] mt-4 text-[1rem] sm:text-[1.2rem] lg:text-[1.3rem]">
							Each month, more than 3 million job seekers turn to Job24 to
							search for their dream job, making over 140,000 job applications
							on a daily basis.
						</p>
						{/* Search & button div*/}
						<div className="mt-6">
							<input
								type="text"
								placeholder="Search for jobs"
								className="px-4 py-[7px] mb-2 w-full md:w-[80%] lg:w-full xl:w-[85%] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a363f] focus:border-transparent"
							/>
							<button className="px-6 py-2  w-full md:w-[80%] lg:w-full xl:w-[85%] bg-blue-700 hover:bg-blue-800 transition-all duration-300 hover:shadow-md text-white rounded-lg mt-3">
								Search
							</button>
						</div>
					</div>
					{/* image */}
					<div className="hidden lg:block w-full ml-auto h-full">
						<Image
							src="/hero.svg"
							height={3000}
							width={3000}
							alt="hero image"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
