import React from "react";
import styles from "../assets/css/map.module.css";
import TwoBtnBar from "../components/TwoButtonBar";

const Maps = () => {
  return (
    <div>
      <TwoBtnBar />
      <div className={styles.map}></div>
    </div>
  );
};

export default Maps;
