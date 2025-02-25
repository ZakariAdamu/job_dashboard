import React from "react";

interface Props {
	mainHeading: string;
	subHeading: string;
}

const Heading = ({ mainHeading, subHeading }: Props) => {
	return (
		<div className="text-center p-3">
			<h2 className="text-2xl font-semibold text-gray-800">{mainHeading}</h2>
			<p className="text-gray-500">{subHeading}</p>
		</div>
	);
};

export default Heading;
