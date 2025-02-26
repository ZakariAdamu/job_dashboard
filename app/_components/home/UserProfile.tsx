"use client";

import { useAppStore } from "@/app/lib/store/store";

const UserProfile = () => {
	const { user } = useAppStore(); // Import user & setSkills from Zustand

	return (
		<div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow">
			<h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
			<div className="flex items-center gap-4 mt-4">
				<img
					src={user?.image || "/default-avatar.jpg"}
					alt="Profile Picture"
					className="w-16 h-16 rounded-full"
				/>
				<div>
					<p className="text-lg font-semibold">{user?.name}</p>
					<p className="text-gray-600">{user?.email}</p>
				</div>
			</div>

			{/* Skills Section */}
			<div className="mt-6">
				<h2 className="text-xl font-semibold text-gray-800">Skills</h2>
				<ul className="mt-2 grid grid-cols-2 gap-2">
					{user?.skills?.map((skill, index) => (
						<li key={index} className="bg-gray-200 px-3 py-1 rounded-md">
							{skill}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default UserProfile;
