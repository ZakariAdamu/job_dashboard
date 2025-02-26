// "use client";

// import { Session } from "next-auth";
// import { signOut } from "next-auth/react";

// interface SessionProps {
// 	session: Session;
// }
// const User = ({ session }: SessionProps) => {
// 	return (
// 		<>
// 			<div
// 				onClick={() => {
// 					signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}/signup` });
// 				}}
// 				className="cursor-pointer"
// 			>
// 				<img
// 					className="rounded-full w-[40px] h-[40px]"
// 					src={`${session.user?.image}`}
// 					alt="user image"
// 				/>
// 			</div>
// 		</>
// 	);
// };

// export default User;

"use client";

import { useState, useRef, useEffect } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface SessionProps {
	session: Session;
}

const UserMenu = ({ session }: SessionProps) => {
	const [showMenu, setShowMenu] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	let timeoutId: NodeJS.Timeout;

	// Handle menu visibility with a delay before closing
	const handleMouseEnter = () => {
		clearTimeout(timeoutId); // Prevent immediate closure
		setShowMenu(true);
	};

	const handleMouseLeave = () => {
		timeoutId = setTimeout(() => setShowMenu(false), 100);
	}; // Delay menu closing by 100ms

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={menuRef}>
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className="cursor-pointer"
			>
				<img
					className="rounded-full w-10 h-10 hover:border-blue-500 transition"
					src={session.user?.image || "/default-avatar.jpg"}
					alt="User avatar"
				/>
			</div>

			{showMenu && (
				// User menu dropdown card
				<div
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-200 shadow-lg rounded-lg p-3"
				>
					<Link href="/userProfile">
						<button className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
							View Profile
						</button>
					</Link>
					<hr className="my-2" />
					<button
						onClick={() => signOut({ callbackUrl: "/signup" })}
						className="block w-full text-left px-3 py-2 text-sm text-slate-800 hover:bg-gray-100 rounded"
					>
						Sign Out
					</button>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
