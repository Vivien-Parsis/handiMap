import React from "react";
import StarIcon from "../assets/images/star-svgrepo-com.svg?react";

const starBar = ({ note }) => {
	const forStars = (note) => {
		let content = [];
		if (!note || note === 0) {
			return;
		}
		for (let i = 0; i < note; i++) {
			content.push(<StarIcon key={i} className="starIcons" />);
		}
		return content;
	};
	return <>{forStars(note)}</>;
};

export default starBar;
