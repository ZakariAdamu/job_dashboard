"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppStore } from "@/app/lib/store/store";
import { useRouter } from "next/navigation";
import Modal from "@/app/_components/Helper/Modal"; //
// Ensure you have this component
// import { IJob } from "@/app/lib/models/Job";

const ApplyButton = ({
	// job,
	missingSkills,
	hasMissingSkills,
}: {
	// job: IJob;
	missingSkills: string[];
	hasMissingSkills: boolean;
}) => {
	const { user } = useAppStore();
	console.log(user?.email);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const router = useRouter();

	// Handle Apply Click
	const handleApplyClick = () => {
		if (!user) {
			router.push("/signup");
		}
		if (hasMissingSkills) {
			setIsModalOpen(true);
		} else {
			applyHandler();
		}
	};

	// Internal Apply Handler (Success Toast)
	const applyHandler = () => {
		toast.success("Application submitted successfully!");
		setIsModalOpen(false);
	};

	return (
		<div>
			{/* Apply Now Button */}
			<button
				onClick={handleApplyClick}
				className="px-8 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all duration-300"
			>
				Apply Now
			</button>

			{/* Toast Container */}
			<ToastContainer position="top-center" autoClose={3000} />

			{/* Missing Skills Modal */}
			{isModalOpen && (
				<Modal
					isOpen={isModalOpen}
					title="Missing Skills"
					onClose={() => setIsModalOpen(false)}
				>
					<p className="mt-2 text-gray-700">
						You are missing the following skills required for this job:
					</p>
					<ul className="mt-4 list-disc list-inside text-red-500">
						{missingSkills.map((skill, index) => (
							<li key={index}>{skill}</li>
						))}
					</ul>
					<div className="mt-6 flex gap-4">
						{/* Upskill Now Button */}
						<button
							onClick={() => alert("Redirecting to upskill resources...")}
							className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all w-full"
						>
							Upskill Now
						</button>
						{/* Continue Application Button */}
						<button
							onClick={applyHandler}
							className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all w-full"
						>
							Continue
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default ApplyButton;
