import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api_url } from "../config/const";
import "../assets/css/style.css";
import "../assets/css/login.css";
import Footer from "../components/footer";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(`${api_url}/auth/login`, formData)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate("/map");
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
    <div className="backgroundBlured">
      <div className="auth-container">
        <h2>Connexion</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} className="formLogin">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
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
            required
          />
          <button type="submit">Se connecter</button>
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
