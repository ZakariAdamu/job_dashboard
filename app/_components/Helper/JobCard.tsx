import { IJob } from "@/app/lib/models/Job";
import { BiDollar } from "react-icons/bi";
import { FaMapLocationDot } from "react-icons/fa6";

interface JobCardProps {
	job: IJob;
	

}
const JobCard = ({ job }: JobCardProps) => {
	return (
		<div className="p-4 mb-6 relative border-2 cursor-pointer hover:scale-110 hover:shadow-sm transition-all duration-300 border-gray-100 rounded-lg">
			{/* Card items */}
			<div className="flex flex-col items-center justify-center mx-auto">
				<div className="">
					<h2 className="text-2xl font-semibold text-gray-800 mb-2">
						{job.title} - {job.company}
					</h2>
				</div>
				<div className="flex items-center justify-center space-x-4 md:space-x-10">
					<div className="flex items-center space-x-2">
						<FaMapLocationDot className="w-[1rem] h-[1rem] text-red-500" />
						<p className="text-[14px] text-gray-400 font-semibold">
							{job?.location}
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<BiDollar className="w-[1rem] h-[1rem] text-red-500" />
						<p className="text-[14px] text-gray-400 font-semibold">
							{job?.salary}
						</p>
					</div>
				</div>
				<div className="flex items-center space-x-2 sm:space-x-4 mt-[1rem]">
					<div className="text-[12px] text-gray-500 px-3 py-1 rounded-full font-semibold capitalize bg-green-100">
						{/* {job?.jobType} */}
						Full-time
					</div>
					<div className="text-[12px] text-gray-500 px-3  py-1 rounded-full font-semibold capitalize bg-blue-100">
						Part-time
					</div>
					<div className="text-[12px] text-gray-500 px-3  py-1 rounded-full font-semibold capitalize bg-red-100">
						Contract
					</div>
				</div>
				<div className="flex items-center justify-between mt-5 text-gray-500 text-[13px] font-semibold">
					Required Skills: {job.requiredSkills}
				</div>
				<div className="flex items-center justify-between mt-5 text-gray-500 text-[13px] font-semibold">
					Avg. Match Score: {job.matchScore}%
				</div>
			</div>
		</div>
	);
};

export default JobCard;
