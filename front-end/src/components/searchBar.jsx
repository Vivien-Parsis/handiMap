import PropTypes from "prop-types";
import styles from "../assets/css/component/searchBar.module.css";
import searchIcon from "../assets/images/search-svgrepo-com.png";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="search..."
        id="search"
        value={value}
        onChange={onChange}
      ></input>
      <img alt="search icon" src={searchIcon} />
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchBar;
