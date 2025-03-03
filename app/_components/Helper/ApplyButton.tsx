"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "@/app/_components/Helper/Modal";

interface ApplyButtonProps {
	missingSkills: string[];
	hasMissingSkills: boolean;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({
	missingSkills,
	hasMissingSkills,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data: session, status } = useSession();
	const router = useRouter();

	// Handle Apply Click
	const handleApplyClick = () => {
		if (status === "loading") return; // Prevent clicking while session is loading

		if (!session) {
			toast.info("Please sign up to apply.");
			router.push("/signup");
			return;
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
				disabled={status === "loading"}
				className={`px-8 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
					status === "loading"
						? "bg-gray-400 cursor-not-allowed"
						: "bg-blue-600 hover:bg-blue-700"
				}`}
			>
				{status === "loading" ? "Checking..." : "Apply Now"}
			</button>

			{/* Toast Notifications */}
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
