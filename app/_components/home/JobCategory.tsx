import React from "react";
import Heading from "../Helper/Heading";
import JobCategoryCard from "./JobCategoryCard";

const JobCategory = () => {
	return (
		<div className="pt-10 pb-5 my-10 md:min-h-[60vh]">
			<Heading
				mainHeading="Popular Job Categories"
				subHeading="Recent jobs live - 293 added today"
			/>
			<div className="w-[80%] mx-auto grid md:grid-cols-2 lg:grid-cols-3  mt-[3rem] gap-4 items-center">
				<JobCategoryCard
					image="/icon1.png"
					category="Finance"
					openPosition="(22 open position)"
				/>
				<JobCategoryCard
					image="/icon2.png"
					category="Software Engineering"
					openPosition="(25 open position)"
				/>
				<JobCategoryCard
					image="/icon3.png"
					category="Marketing"
					openPosition="(10 open position)"
				/>
				<JobCategoryCard
					image="/icon4.png"
					category="Human Resource"
					openPosition="(15 open position)"
				/>
				<JobCategoryCard
					image="/icon5.png"
					category="Automotive "
					openPosition="(20 open position)"
				/>
				<JobCategoryCard
					image="/icon6.png"
					category="Project Management"
					openPosition="(10 open position)"
				/>
			</div>
		</div>
	);
};

export default JobCategory;
