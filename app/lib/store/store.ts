import { create } from "zustand";

interface AppState {
	user: {} | null;
	jobs: [];
	loading: boolean;
	setUser: (user: {}) => void;
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
