import { NextResponse } from "next/server";

export function middleware(req: Request) {
	const res = NextResponse.next();

	// Allow frontend origin
	res.headers.append(
		"Access-Control-Allow-Origin",
		process.env.NEXT_PUBLIC_API_URL || "*"
	);
	res.headers.append(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.headers.append(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	res.headers.append("Access-Control-Allow-Credentials", "true");

	return res;
}

export const config = {
	matcher: "/api/:path*", // Apply only to API routes
};
