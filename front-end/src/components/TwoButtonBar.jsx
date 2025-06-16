import React from "react";
import { Link } from "react-router";
import styles from "../assets/css/component/twoBtnBar.module.css";
import accountIcon from "../assets/images/person-svgrepo-com.png";
import tripIcon from "../assets/images/trip-svgrepo-com.png";
import searchIcon from "../assets/images/search-svgrepo-com.png";

const TwoBtnBar = () => {
  return (
    <div className={styles.twoBtnBar}>
      <div className={styles.searchBar}>
        <input type="text" placeholder="search..." id="search"></input>
        <img alt="search icon" src={searchIcon} />
      </div>
      <div>
        <Link to="/account">
          <img src={accountIcon} alt="profile" />
        </Link>
        <Link to="/">
          <img src={tripIcon} alt="trajet" />
        </Link>
      </div>
    </div>
  );
};

export default TwoBtnBar;
