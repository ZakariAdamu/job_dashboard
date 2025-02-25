"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface Props {
	session: Session;
}
const User = ({ session }: Props) => {
	return (
		<>
			<div
				onClick={() => {
					signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}/signup` });
				}}
				className="cursor-pointer"
			>
				<img
					className="rounded-full w-[40px] h-[40px]"
					src={`${session.user?.image}`}
					alt="user image"
				/>
			</div>
		</>
	);
};

export default User;
