import ApplyButton from "@/app/_components/Helper/ApplyButton";
import JobCard from "@/app/_components/Helper/JobCard";
import { auth } from "@/auth";
import { getJobById } from "@/app/lib/actions/actions";
import Link from "next/link";
// import { Metadata } from "next";
import ProgressBar from "@/app/_components/Helper/ProgressBar";

// export async function generateMetadata({
// 	params,
// }: {
// 	params: { id: string };
// }): Promise<Metadata> {
// 	const job = await getJobById(params.id);
// 	return {
// 		title: job ? `${job.title} at ${job.company}` : "Job Not Found",
// 		description: job
// 			? `Exciting opportunity for a ${job.title} at ${job.company}.`
// 			: "Job details not available.",
// 	};
// }

const JobDetailsPage = async ({ params }: { params: { id: string } }) => {
	const session = await auth();
	const job = await getJobById(params.id);

	if (!job) {
		return (
			<div className="flex items-center justify-center h-screen text-gray-600">
				<h2 className="text-2xl font-semibold">Job not found</h2>
			</div>
		);
	}

	const { title, company, location, requiredSkills } = job;

	return (
		<div className="mt-20 mb-12">
			<div className="flex flex-col sm:flex-row items-center justify-between w-[80%] mx-auto">
				<div className="flex-[0.7]">
					<JobCard job={job} />
				</div>
				{session ? (
					<ApplyButton />
				) : (
					<Link href="/signup">
						<button className="px-8 py-3 bg-emerald-600 rounded-lg text-white font-semibold hover:bg-emerald-700 transition-all duration-300">
							Sign Up To Apply
						</button>
					</Link>
				)}
			</div>
			<div className="mt-10 w-[80%] mx-auto">
				<h2 className="text-lg font-semibold">Job Fit Progress</h2>
				<ProgressBar matchScore={80} />
			</div>

			<div className="mt-16 w-[80%] mx-auto">
				<h2 className="text-2xl font-semibold text-gray-800">
					Job Description
				</h2>
				<p className="mt-4 text-gray-700">
					Exciting opportunity for a Full-Time {title} at {company}, {location}.
					Join our team and make an impact! Lorem ipsum dolor sit amet
					consectetur adipisicing elit.
				</p>

				<h2 className="text-2xl font-semibold mt-3 text-gray-800">
					Key Responsibilities
				</h2>
				<p className="mt-4 text-gray-700">
					As a Full-Time {title} at {company}, you will be responsible for
					building elegant and scalable applications. Lorem ipsum dolor sit amet
					consectetur adipisicing elit.
				</p>

				<h2 className="text-2xl font-semibold mt-3 text-gray-800">Skills</h2>
				<ul className="mt-4">
					{requiredSkills?.length > 0 ? (
						requiredSkills.map((skill: string, index: number) => (
							<li key={index} className="text-gray-700">
								{skill}
							</li>
						))
					) : (
						<li className="text-gray-500">No skills listed</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default JobDetailsPage;
