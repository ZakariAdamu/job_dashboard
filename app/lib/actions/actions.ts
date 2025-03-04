// Get all jobs

import { IJob } from "../models/Job";

// export const getJobs = async (): Promise<IJob[]> => {
// 	try {
// 		if (!process.env.NEXT_PUBLIC_API_URL)
// 			throw new Error("API URL is not defined");

// 		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job`, {
// 			method: "GET",
// 			credentials: "include", // Ensure cookies/auth are sent
// 			headers: { "Content-Type": "application/json" },
// 		});

// 		if (!response.ok) throw new Error(`Error: ${response.status}`);

// 		const data = await response.json();
// 		return Array.isArray(data.jobs) ? data.jobs : [];
// 	} catch (error) {
// 		console.error("Error fetching jobs:", error);
// 		return [];
// 	}
// };

// Get a unique / dynamic job by ID
export const getJobById = async (id: string) => {
	try {
		if (!id) throw new Error("Job ID is required");

		const apiUrl = new URL(`/api/job/${id}`, process.env.NEXT_PUBLIC_API_URL);
		const response = await fetch(apiUrl.toString(), {
			method: "GET",
			credentials: "include", // Ensure cookies/auth are sent
			headers: { "Content-Type": "application/json" },
			next: { revalidate: 60 }, // Revalidate data every 60 seconds (ISR)
		});

		// Handle non-200 responses
		if (!response.ok) {
			const errorMessage = `Error ${response.status}: ${response.statusText}`;
			console.error(`Failed to fetch job (ID: ${id}) - ${errorMessage}`);
			return null;
		}

		const { job } = await response.json();

		return job || null;
	} catch (error) {
		console.error(`Error fetching job by ID (${id}):`, error);
		return null;
	}
};
