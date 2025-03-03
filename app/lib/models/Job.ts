import { Schema, Document, model, models } from "mongoose";

export interface IJob extends Document {
	id?: string;
	title: string;
	company: string;
	location: string;
	salary: number;
	jobType?: string;
	requiredSkills: string[];
	matchScore?: number;
	createdAt?: Date;
}

const JobSchema = new Schema<IJob>(
	{
		id: { type: String, required: false },
		title: { type: String, required: true },
		company: { type: String, required: true },
		location: { type: String, required: true },
		salary: { type: Number, required: true },
		jobType: {
			type: String,
			enum: ["Full-Time", "Part-Time", "Remote"],
			required: false,
		},
		requiredSkills: { type: [String], required: true },
		matchScore: { type: Number, default: 50 },
		createdAt: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

// Prevent model recompilation in hot reloads
const Job = models.Job || model<IJob>("Job", JobSchema);

export default Job;
