import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI as string;

if (!MONGO_URI) {
	throw new Error("Please define the MONGODB_URI environment variable");
}

let isConnected = false; // Track connection status

export const connectToDB = async () => {
	if (isConnected) {
		console.log("✅ Using existing MongoDB connection");
		return;
	}

	try {
		const db = await mongoose.connect(MONGO_URI, {
			dbName: "JobBoard0225", // Change to your database name
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as mongoose.ConnectOptions);

		isConnected = !!db.connections[0].readyState;
		console.log("🚀 MongoDB connected successfully");
	} catch (error) {
		console.error("❌ MongoDB connection error:", error);
		process.exit(1);
	}
};
