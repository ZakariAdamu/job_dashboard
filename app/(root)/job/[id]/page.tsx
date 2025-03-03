import JobCard from "@/app/_components/Helper/JobCard";
import { getJobById } from "@/app/lib/actions/actions";
import Link from "next/link";
import ProgressBar from "@/app/_components/Helper/ProgressBar";
import ApplyButton from "@/app/_components/Helper/ApplyButton";

// Generate Metadata for SEO Optimization
export async function generateMetadata(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;
	const job = await getJobById(params.id);
	return {
		title: job ? `${job.title} at ${job.company}` : "Job Not Found",
		description: job
			? `Exciting opportunity for a ${job.title} at ${job.company}, ${job.location}.`
			: "Find your next job opportunity.",
	};
}

// Default User Skills
const userSkills = [
	"HTML",
	"CSS",
	"JavaScript",
	"TypeScript",
	"React.js",
	"Next.js",
	"Node.js",
	// "Express.js",
	// "MongoDB",
	"Git & GitHub",
];

const JobDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;
	const job = await getJobById(params.id);

	// If job does not exist, return a "Not Found" state
	if (!job) {
		return (
			<div className="text-center mt-20">
				<h1 className="text-2xl font-bold text-red-600">Job Not Found</h1>
				<p className="mt-4 text-gray-600">
					The job listing you're looking for doesn't exist.
				</p>
				<Link
					href="/"
					className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
				>
					Go Back Home
				</Link>
			</div>
		);
	}

	// Extract job details
	const { title, company, location, requiredSkills = [] } = job;

	// Calculate Skill Match Percentage
	const matchedSkills = userSkills.filter((skill) =>
		requiredSkills.includes(skill)
	).length;
	const matchScore = requiredSkills.length
		? Math.round((matchedSkills / requiredSkills.length) * 100)
		: 50;

	// Find Missing Skills
	const missingSkills = requiredSkills.filter(
		(skill: string) => !userSkills.includes(skill)
	);
	const hasMissingSkills = missingSkills.length > 0;

	return (
		<div className="mt-20 mb-12">
			<div className="flex flex-col sm:flex-row items-center justify-between w-[80%] mx-auto">
				<div className="flex-[0.7]">
					<JobCard job={job} />
				</div>
				<ApplyButton
					// job={job}
					missingSkills={missingSkills}
					hasMissingSkills={hasMissingSkills}
				/>
			</div>

			{/* Job Fit Progress bar */}
			<div className="mt-10 w-[80%] mx-auto">
				<h2 className="text-lg font-semibold">Job Fit Progress</h2>
				<ProgressBar matchScore={matchScore} />
			</div>

			{/* Job Description Section */}
			<div className="mt-16 w-[80%] mx-auto space-y-6">
				<h2 className="text-2xl font-semibold text-gray-800">
					Job Description
				</h2>
				<p className="text-gray-700">
					Exciting opportunity for a Full-Time {title} at {company}, {location}.
					Join our team and make an impact!
				</p>

				<h2 className="text-2xl font-semibold text-gray-800">
					Key Responsibilities
				</h2>
				<p className="text-gray-700">
					As a {title} at {company}, you will be responsible for building
					elegant and scalable applications.
				</p>

				<h2 className="text-2xl font-semibold text-gray-800">
					Skills Required
				</h2>
				<ul className="list-disc pl-5 text-gray-700">
					{requiredSkills.length > 0 ? (
						requiredSkills.map((skill: string, index: number) => (
							<li key={index}>{skill}</li>
						))
					) : (
						<li className="text-gray-500">No specific skills required</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default JobDetailsPage;
