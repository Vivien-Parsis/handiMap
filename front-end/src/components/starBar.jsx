import React from "react";

const starBar = ({note}) => {
    const forStars = (note) => {
		let content = [];
        if(!note || note===0){
            return
        }
		for (let i = 0; i < note; i++) {
			content.push(<img src={starIcon} alt="Star avis" key={i} className="starIcons"/>);
		}
		return content;
	};
    return ({forStars()})
}

export default starBar;