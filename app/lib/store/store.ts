import { create } from "zustand";

interface User {
	id: string;
	name: string;
	email: string;
	// Add other properties as needed
}

interface AppState {
	user: User | null;
	jobs: [];
	loading: boolean;
	setUser: (user: User) => void;
	setJobs: (jobs: []) => void;
	setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
	user: null,
	jobs: [],
	loading: false,

	setUser: (user) => set({ user }),
	setJobs: (jobs) => set({ jobs }),
	setLoading: (loading) => set({ loading }),
}));
