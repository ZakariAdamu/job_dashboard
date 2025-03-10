// import Heading from "../Helper/Heading";
// import Link from "next/link";
// import JobCard from "../Helper/JobCard";
// // import { getJobs } from "@/app/lib/actions/actions";

// const JobListings = async () => {
// 	const jobs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job`, {
// 		method: "GET",
// 		credentials: "include",
// 		headers: { "Content-Type": "application/json" },
// 	}).then((res) => res.json());

// 	// Ensure jobs is always an array
// 	if (!Array.isArray(jobs) || jobs.length === 0) {
// 		return (
// 			<div className="py-8 text-center">
// 				<Heading
// 					mainHeading="Job Listings"
// 					subHeading="Review the following job listings and apply now."
// 				/>
// 				<p className="text-gray-600 font-semibold mt-6">No jobs found</p>
// 			</div>
// 		);
// 	}

// 	return (
// 		<section className="py-8 my-10">
// 			<Heading
// 				mainHeading="Job Listings"
// 				subHeading="Review the following job listings and apply now."
// 			/>

// 			<div className="mt-10 w-[90%] md:w-[80%] mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-6">
// 				{jobs.map((job) => (
// 					<Link href={`/job/${job._id}`} key={job.id} className="block">
// 						<JobCard job={job} />
// 					</Link>
// 				))}
// 			</div>

// 			<div className="text-center mt-12">
// 				<Link href="/job/allJobs">
// 					<button className="px-6 py-3 w-full max-w-[300px] font-semibold bg-blue-700 hover:bg-blue-800 rounded-lg text-white transition-all duration-300">
// 						View All Jobs
// 					</button>
// 				</Link>
// 			</div>
// 		</section>
// 	);
// };

// export default JobListings;

import Heading from "../Helper/Heading";
import Link from "next/link";
import JobCard from "../Helper/JobCard";
import { IJob } from "@/app/lib/models/Job";

const fetchJobs = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job`, {
			method: "GET",
			// credentials: "include",
			headers: { "Content-Type": "application/json" },
			next: { revalidate: 60 }, // ✅ Cache jobs for 60 seconds
		});

		// if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.statusText}`);

		const data = await res.json();
		return Array.isArray(data.jobs) ? data.jobs : [];
	} catch (error) {
		console.error("Error fetching jobs:", error);
		return [];
	}
};

const JobListings = async () => {
	const jobs = await fetchJobs();

	return (
		<section className="py-8 my-10">
			<Heading
				mainHeading="Job Listings"
				subHeading="Review the following job listings and apply now."
			/>

			{jobs.length === 0 ? (
				<div className="text-center mt-6">
					<p className="text-gray-600 font-semibold">No jobs found</p>
				</div>
			) : (
				<div className="mt-10 w-[90%] md:w-[80%] mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-6">
					{jobs.map((job: IJob) => (
						<Link
							href={`/job/${job._id}`}
							key={job._id as string | number}
							className="block"
						>
							<JobCard job={job} />
						</Link>
					))}
				</div>
			)}

			<div className="text-center mt-12">
				<Link href="/job/allJobs">
					<button className="px-6 py-3 w-full max-w-[300px] font-semibold bg-blue-700 hover:bg-blue-800 rounded-lg text-white transition-all duration-300">
						View All Jobs
					</button>
				</Link>
			</div>
		</section>
	);
};

export default JobListings;
