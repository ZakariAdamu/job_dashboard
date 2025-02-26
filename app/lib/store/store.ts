import { create } from "zustand";

interface User {
	id: string;
	name: string;
	email: string;
	image: string;
	skills: string[];
}

interface AppState {
	user: User | null;
	jobs: [];
	loading: boolean;
	setUser: (user: User) => void;
	setJobs: (jobs: []) => void;
	setLoading: (loading: boolean) => void;
	setSkills: (skills: string[]) => void;
}

// Default skills array
const userSkills = [
	"HTML",
	"CSS",
	"JavaScript",
	"TypeScript",
	"React.js",
	"Next.js",
	"Node.js",
	"Express.js",
	"MongoDB",
	"Git & GitHub",
];

export const useAppStore = create<AppState>((set) => ({
	user: {
		id: "",
		name: "",
		email: "",
		image: "",
		skills: userSkills, // Initialize user with default skills
	},
	jobs: [],
	loading: false,

	setUser: (user) => set({ user }),
	setJobs: (jobs) => set({ jobs }),
	setLoading: (loading) => set({ loading }),

	// Function to update skills
	setSkills: (skills) =>
		set((state) => ({
			user: state.user ? { ...state.user, skills } : null,
		})),
}));
