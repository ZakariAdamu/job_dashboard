// Get all jobs

import { IJob } from "../models/Job";

export const getJobs = async (): Promise<IJob[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) throw new Error(`Error: ${response.status}`);

		const data = await response.json();
		return Array.isArray(data.jobs) ? data.jobs : [];
	} catch (error) {
		console.error("Error fetching jobs:", error);
		return [];
	}
};

export const getJobById = async (id: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/job?id=${id}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
				cache: "no-store", // Avoid caching outdated job info
			}
		);

		if (!response.ok) {
			console.error(`Error fetching job (ID: ${id})`);
			return null;
		}

		const data = await response.json();
		return data.job || null;
	} catch (error) {
		console.error("Error fetching job by ID:", error);
		return null;
	}
};
