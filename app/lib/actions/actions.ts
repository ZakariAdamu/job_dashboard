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
