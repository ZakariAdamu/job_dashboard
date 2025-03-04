import React from "react";
import Hero from "./Hero";
import JobCategory from "./JobCategory";
// import JobListings from "./JobListings";
import JobListings from "./JobListings";

const Home = () => {
	return (
		<div className="overflow-hidden">
			<Hero />
			<JobCategory />
			{/* <JobListings /> */}
			<JobListings />
		</div>
	);
};

export default Home;
