import { Link } from "react-router";
import PropTypes from "prop-types";

const LinkBar = ({ link, text, state }) => {
  return (
    <div className="linkBar">
      <Link to={link} state={state || {}}>
        {"> "}
        {text}
      </Link>
    </div>
  );
};

LinkBar.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  state: PropTypes.object
};

export default LinkBar;
