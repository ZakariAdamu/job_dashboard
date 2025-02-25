import React from "react";
import Hero from "./Hero";
import JobCategory from "./JobCategory";
// import JobListings from "./JobListings";
import JobListingsBeta from "./JobListingsBeta";

const Home = () => {
	return (
		<div className="overflow-hidden">
			<Hero />
			<JobCategory />
			{/* <JobListings /> */}
			<JobListingsBeta />
		</div>
	);
};

export default Home;
