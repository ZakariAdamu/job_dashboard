"use client";

interface ProgressBarProps {
	matchScore: number; // Expect a number between 0 and 100
}

const ProgressBar = ({ matchScore }: ProgressBarProps) => {
	const getProgressColor = () => {
		if (matchScore <= 40) return "bg-red-500"; // Low Fit
		if (matchScore <= 79) return "bg-yellow-500"; // Medium Fit
		return "bg-green-500"; // High Fit
	};

	return (
		<div className="w-full bg-gray-200 rounded-full h-5 mt-4 relative">
			<div
				className={`h-5 rounded-full ${getProgressColor()} transition-all duration-500`}
				style={{ width: `${matchScore}%` }}
			></div>
			<span className="absolute inset-0 flex justify-center items-center text-sm font-semibold text-gray-700">
				{matchScore}% Fit
			</span>
		</div>
	);
};

export default ProgressBar;
