import Heading from "../Helper/Heading";
import Link from "next/link";
import JobCard from "../Helper/JobCard";
import { getJobs } from "@/app/lib/actions/actions";

const JobListingsBeta = async () => {
	const jobs = await getJobs();
	// console.log(typeof jobs);

	// Ensure jobs is always an array
	if (!Array.isArray(jobs) || jobs.length === 0) {
		return (
			<div className="py-8 text-center">
				<Heading
					mainHeading="Job Listings"
					subHeading="Review the following job listings and apply now."
				/>
				<p className="text-gray-600 font-semibold mt-6">No jobs found</p>
			</div>
		);
	}

	return (
		<section className="py-8 my-10">
			<Heading
				mainHeading="Job Listings"
				subHeading="Review the following job listings and apply now."
			/>

			<div className="mt-10 w-[90%] md:w-[80%] mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-6">
				{jobs.map((job) => (
					<Link href={`/job/${job._id}`} key={job.id} className="block">
						<JobCard job={job} />
					</Link>
				))}
			</div>

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

export default JobListingsBeta;
