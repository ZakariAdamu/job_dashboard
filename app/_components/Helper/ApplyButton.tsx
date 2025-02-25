"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplyButton = () => {
	const applyHandler = () =>
		toast.success("Application submitted successfully!");
	return (
		<div>
			<button
				onClick={applyHandler}
				className="px-10 rounded-lg py-3 bg-blue-600 text-white font-semibold transition-all duration-300 hover:bg-blue-700"
			>
				Apply Now
			</button>
			<ToastContainer position="top-right" />
		</div>
	);
};

export default ApplyButton;
