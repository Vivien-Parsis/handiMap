import PropTypes from "prop-types";
import StarIcon from "../assets/images/star-svgrepo-com.svg?react";

const StarBar = ({ note }) => {
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

StarBar.propTypes = {
  note: PropTypes.number.isRequired,
};

export default StarBar;
