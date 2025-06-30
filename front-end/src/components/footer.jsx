import { Link } from "react-router";
import styles from "../assets/css/component/footer.module.css";

const Footer = () => {
  const handleChangeTheme = (e) => {
    e.preventDefault();
    localStorage.setItem("theme", e.target.value);
    document.documentElement.setAttribute("data-theme", e.target.value);
  };

  return (
    <footer style={styles}>
      <Link to="/MentionsLegales">Mention légales</Link>
      <form>
        <label htmlFor="theme">Changer de thème : </label>
        <select
          id="theme"
          onChange={handleChangeTheme}
          defaultValue={localStorage.getItem("theme") || "defaut"}
        >
          <option value="monocolor">Monocolor</option>
          <option value="defaut">Défaut</option>
        </select>
      </form>
    </footer>
  );
};

export default Footer;
