import Image from "next/image";
import React from "react";

interface Props {
	category: string;
	image: string;
	openPosition: string;
}

const JobCategoryCard = ({ category, image, openPosition }: Props) => {
	return (
		<div className="p-4 border-2 flex items-center gap-5 cursor-pointer hover:scale-110 hover:shadow-sm transition-all duration-300 border-gray-500 rounded-lg border-opacity-10">
			<Image src={image} alt={category} width={60} height={60} />
			<div className="flex flex-col">
				<h3 className="text-[17px] font-semibold mb-[0.4rem]">{category}</h3>
				<p className="text-[14px] text-slate-500 font-semibold ">
					{openPosition}
				</p>
			</div>
		</div>
	);
};

export default JobCategoryCard;
