"use client";

import { SessionProvider } from "next-auth/react";
import { useAppStore } from "@/app/lib/store/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
	children: React.ReactNode;
}

const ClientProvider = ({ children }: Props) => {
	const { setUser } = useAppStore();

	const router = useRouter();

	useEffect(() => {
		// Fetch session and store user in Zustand
		const fetchSession = async () => {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`
			);
			const session = await res.json();
			if (session?.user) {
				setUser(session.user);
				router.push("/");
			}
		};

		fetchSession();
	}, [setUser]);

	return <SessionProvider>{children}</SessionProvider>;
};

export default ClientProvider;
