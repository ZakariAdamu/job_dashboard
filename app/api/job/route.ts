// import { auth } from "@/auth";
import Job from "@/app/lib/models/Job";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongoDB";
import { Types } from "mongoose";
import Cors from "cors";

// Initialize CORS middleware
const cors = Cors({
	origin: process.env.NEXT_PUBLIC_API_URL || "*", // Allow frontend origin
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true, // Allow cookies and sessions
});

// Middleware helper to run CORS
function runMiddleware(req: NextRequest) {
	const corsRequest = {
		method: req.method,
		headers: Object.fromEntries(req.headers.entries()),
	} as Cors.CorsRequest;

	return new Promise((resolve, reject) => {
		cors(corsRequest, {} as any, (result: any) => {
			if (result instanceof Error) reject(result);
			resolve(result);
		});
	});
}

export const POST = async (req: NextRequest) => {
	try {
		// const session = await auth();
		// Don't check user session for now
		// if (!session) {
		// 	return handleErrorResponse("Unauthorized, please sign in", 401);
		// }

		await runMiddleware(req);

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
		await runMiddleware(req);

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
