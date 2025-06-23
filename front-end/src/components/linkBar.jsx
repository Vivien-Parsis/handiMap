import { Link } from "react-router";
import PropTypes from "prop-types";

const LinkBar = ({ link, text, state, search, query }) => {
  return (
    <div className="linkBar">
      <Link
        to={
          search && query
            ? { pathname: link, search: `?${search}=${query}` }
            : link
        }
        state={state || {}}
      >
        {text}
      </Link>
    </div>
  );
};

LinkBar.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  state: PropTypes.object,
  search: PropTypes.string,
  query: PropTypes.string,
};

export default LinkBar;
