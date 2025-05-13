import React from "react";
import { Link } from 'react-router-dom';
import styles from "../assets/css/twoBtnBar.module.css"
import accountIcon from "../assets/images/person-svgrepo-com.png"
import tripIcon from "../assets/images/trip-svgrepo-com.png"

const TwoBtnBar = () => {
    return (
        <div className={styles.twoBtnBar}>
            <Link to="/account"><img src={accountIcon} alt="profile"/></Link>
            <Link to="/trip"><img src={tripIcon} alt="trajet"/></Link>
        </div>
    )
}

export default TwoBtnBar