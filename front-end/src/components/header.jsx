import { Link } from "react-router";
import styles from "../assets/css/component/header.module.css";
import logo from "../assets/images/handimap_white.png";

const Header = () => {
  return (
    <header style={styles.header}>
      <Link to="/">
        <img alt="handimap icon" src={logo} />
        <h1>Handi'Map</h1>
      </Link>
    </header>
  );
};

export default Header;
