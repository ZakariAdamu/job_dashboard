import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongoDB";
import Job from "@/app/lib/models/Job";
import mongoose from "mongoose";

// Utility function for error handling
const handleError = (message: string, status: number) =>
	NextResponse.json({ error: message }, { status });

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	try {
		await connectToDB();

		const { id } = params;

		// Validate MongoDB ObjectId
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return handleError("Invalid Job ID format", 400);
		}

		// Fetch job by ID
		const job = await Job.findById(id).lean();
		if (!job) {
			return handleError("Job not found", 404);
		}

		return NextResponse.json({ job }, { status: 200 });
	} catch (error) {
		console.error("Error fetching job:", error);
		return handleError("Internal server error", 500);
	}
};
