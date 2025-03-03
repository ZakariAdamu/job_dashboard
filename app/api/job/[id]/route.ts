import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongoDB";
import Job from "@/app/lib/models/Job";

// ✅ Fix: Use `context` and await `params`
export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
		// ✅ Ensure DB is connected
		await connectToDB();

		// ✅ Await `params`
		const id = await params.id;

		// ✅ Fetch job from DB
		const job = await Job.findById(id);

		if (!job) {
			return NextResponse.json({ error: "Job not found" }, { status: 404 });
		}

		return NextResponse.json({ job }, { status: 200 });
	} catch (error) {
		console.error("Error fetching job:", error);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
