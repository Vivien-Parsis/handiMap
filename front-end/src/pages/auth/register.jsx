import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { api_url } from "../../config/const";
import styles from "../../assets/css/auth/authForm.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    mail: "",
    password: "",
    password_confirmation: "",
    rgpd: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type == "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    axios
      .post(`${api_url}/api/v1/auth/register`, formData)
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

  return (
    <div className="backgroundBluredNoPadding">
      <div className={styles.authContainer}>
        <h2>Inscription</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleRegister} className={styles.formLogin}>
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />

          <label htmlFor="mail">Adresse mail</label>
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
          <label htmlFor="password_confirmation">Confirmer mot de passe</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
          <input
            type="checkbox"
            required
            name="rgpd"
            id="rgpd"
            onChange={handleChange}
          />
          <label htmlFor="rgpd">
            J’ai lu et j’accepte la{" "}
            <Link to="/mentionslegales">politique de confidentialité</Link>
          </label>
          <button type="submit" className="linkButton">
            S'inscrire
          </button>
        </form>

        <div className="auth-links">
          <p>
            Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
