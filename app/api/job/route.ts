import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongoDB";
import Job from "@/app/lib/models/Job";
import { z } from "zod";

// ✅ Input Validation Schema using Zod
const jobSchema = z.object({
	title: z.string().min(2, "Title is too short"),
	company: z.string().min(2, "Company name is too short"),
	location: z.string().min(2, "Location is required"),
	salary: z.number().positive("Salary must be a positive number"),
	requiredSkills: z
		.array(z.string())
		.nonempty("At least one skill is required"),
});

// 🔹 Error Response Helper
const handleErrorResponse = (message: string, status: number) =>
	NextResponse.json({ error: message }, { status });

/**
 * 📌 [POST] Create a new job listing
 */
export const POST = async (req: NextRequest) => {
	try {
		await connectToDB();

		// ✅ Safely parse request body
		const jsonBody = await req.json().catch(() => null);
		if (!jsonBody) return handleErrorResponse("Invalid JSON payload", 400);

		// ✅ Validate input using Zod
		const validation = jobSchema.safeParse(jsonBody);
		if (!validation.success) {
			const errorMessage = validation.error.errors
				.map((err) => err.message)
				.join(", ");
			return handleErrorResponse(`Validation error: ${errorMessage}`, 400);
		}

		// ✅ Create and save the job entry
		const newJob = await Job.create(validation.data);

		return NextResponse.json(
			{ message: "Job created successfully", job: newJob },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Job creation error:", error);
		return handleErrorResponse("Internal Server Error", 500);
	}
};

/**
 * 📌 [GET] Fetch all jobs
 */
export const GET = async () => {
	try {
		await connectToDB();

		// ✅ Fetch only necessary fields to optimize response size
		const jobs = await Job.find(
			{},
			"title company location salary requiredSkills"
		).lean();

		return NextResponse.json(
			{ jobs: jobs.length ? jobs : [] },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching jobs:", error);
		return handleErrorResponse("Internal Server Error", 500);
	}
};
