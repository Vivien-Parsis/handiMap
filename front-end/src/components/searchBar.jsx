import React from "react";
import styles from "../assets/css/searchBar.module.css";
import searchIcon from "../assets/images/search-svgrepo-com.png";

const SearchBar = () => {
  return (
      <div className={styles.searchBar}>
        <input type="text" placeholder="search..." id="search"></input>
        <img alt="search icon" src={searchIcon} />
      </div>
  );
};

export default SearchBar;
