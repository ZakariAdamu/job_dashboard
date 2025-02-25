export interface Job {
	id: number;
	title: string;
	company: string;
	salary: string;
	location: string;
	jobtype?: string;
	requiredSkills?: string[];
}

const JobData: Job[] = [
	{
		id: 1,
		title: "Software Engineer",
		company: "Tech Corp",
		salary: "35k - 40k",
		location: "London,Uk",
		jobtype: "full time",
		requiredSkills: [
			"React ",
			"Next.js ",
			"JavaScript ",
			"TypeScript ",
			"Tailwind CSS",
		],
	},
	{
		id: 2,
		title: "DevOps Engineer",
		company: "DesignPro",
		salary: "35k - 40k",
		location: "Pakistan",
		jobtype: "full time",
		requiredSkills: [
			"AWS ",
			"Docker ",
			"Cloud Computing ",
			"Kubernetes ",
			"Version Control",
		],
	},
	{
		id: 3,
		title: "Fronetend Engineer",
		company: "Aishub Tech",
		salary: "45k - 50k",
		location: "Remote",
		jobtype: "full time",
		requiredSkills: [
			"React ",
			"Next.js ",
			"JavaScript ",
			"TypeScript ",
			"Tailwind CSS",
		],
	},
	{
		id: 4,
		title: "Backend Developer",
		company: "Google",
		salary: "25k - 30k",
		location: "USA",
		jobtype: "Part time",
		requiredSkills: [
			"React ",
			"Next.js ",
			"JavaScript ",
			"TypeScript ",
			"Node.js ",
			"Express.js",
			"MongoDB",
		],
	},
	{
		id: 5,
		title: "Fullstack Developer",
		company: "Apple",
		salary: "55k - 60k",
		location: "Australia",
		jobtype: "full time",
		requiredSkills: [
			"React ",
			"Next.js ",
			"JavaScript ",
			"TypeScript ",
			"Tailwind CSS ",
			"Node.js ",
			"Express.js ",
			"MongoDB ",
			"Python",
		],
	},
	{
		id: 6,
		title: "Graphics Designer",
		company: "Blue Bird",
		salary: "25k - 30k",
		location: "Canada",
		jobtype: "Freelance",
		requiredSkills: ["Figma ", "Adobe XD ", "Sketch ", "Illustrator"],
	},
];

export default JobData;
