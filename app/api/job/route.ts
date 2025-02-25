// import { connectToDB } from "@/app/lib/mongoDB";
// import { NextResponse } from "next/server";

// export async function GET() {
// 	try {
// 		await connectToDB();
// 		return NextResponse.json({ message: "MongoDB connection successful!" });
// 	} catch (error) {
// 		return NextResponse.json(
// 			{ error: "MongoDB connection failed" },
// 			{ status: 500 }
// 		);
// 	}
// }

import { auth } from "@/auth";
import Job from "@/app/lib/models/Job";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongoDB";
import { Types } from "mongoose";

export const POST = async (req: NextRequest) => {
	try {
		const session = await auth(); // Ensure auth() is awaited if it's an async function
		// Don't check user session for now
		// if (!session) {
		// 	return handleErrorResponse("Unauthorized, please sign in", 401);
		// }

		await connectToDB();

		// Parse request body safely
		const body = await req.json().catch(() => null);
		if (!body) {
			return handleErrorResponse("Invalid JSON payload", 400);
		}

		const { title, company, location, salary, requiredSkills } = body;

		// Validate input
		if (![title, company, location, salary, requiredSkills].every(Boolean)) {
			return handleErrorResponse("All fields are required", 400);
		}

		// Create and save the job entry
		const newJob = new Job({
			title,
			company,
			location,
			salary,
			requiredSkills,
			matchScore: "0",
		});

		await newJob.save();

		return NextResponse.json(
			{ message: "Job created successfully", job: newJob },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Job creation error:", error);
		return handleErrorResponse("Internal server error", 500);
	}
};

const handleErrorResponse = (message: string, status: number) =>
	NextResponse.json({ error: message }, { status });

export const GET = async (req: NextRequest) => {
	try {
		await connectToDB();

		const { searchParams } = new URL(req.url);
		const jobId = searchParams.get("id");

		if (jobId) {
			// Fetch a single job
			if (!Types.ObjectId.isValid(jobId)) {
				return handleErrorResponse("Invalid Job ID format", 400);
			}

			const job = await Job.findById(jobId).lean();
			if (!job) return handleErrorResponse("Job not found", 404);

			return NextResponse.json({ job }, { status: 200 });
		}

		// Fetch all jobs
		const jobs = await Job.find({}).lean();
		return NextResponse.json(
			{ jobs: jobs.length ? jobs : [] },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching jobs:", error);
		return handleErrorResponse("Internal Server Error", 500);
	}
};
