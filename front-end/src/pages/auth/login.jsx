import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { api_url } from "../../config/const";
import styles from "../../assets/css/auth/authForm.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(`${api_url}/api/v1/auth/login`, formData)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate("/");
        } else {
          setError("Erreur de connexion");
        }
      })
      .catch((err) => {
        setError("Erreur de connexion");
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="backgroundBluredNoPadding">
      <div className={styles.authContainer}>
        <h2>Connexion</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} className={styles.formLogin}>
          <label htmlFor="mail">Email</label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength="12"
            maxLength="30"
            required
          />
          <button type="submit" className="linkButton">
            Se connecter
          </button>
        </form>

        <div className="auth-links">
          <p>
            Pas encore de compte ? <Link to="/register">S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
