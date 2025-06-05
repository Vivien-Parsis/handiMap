import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { api_url } from "../config/const";
import styles from "../assets/css/authForm.module.css";

const Register = () => {
	const [formData, setFormData] = useState({
		nom: "",
		prenom: "",
		email: "",
		password: "",
		password_confirmation: ""
	});

	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		axios
			.post(`${api_url}/api/v1/auth/register`, formData)
			.then((res) => {
				if (res.data) {
					localStorage.setItem("token", res.data);
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
		<div className="backgroundBlured">
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

					<label htmlFor="email">Adresse email</label>
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
            minLength="12"
            maxLength="30"
						required
					/>
					<label htmlFor="password_confirmation">
						Confirmer mot de passe
					</label>
					<input
						type="password"
						id="password_confirmation"
						name="password_confirmation"
						value={formData.password_confirmation}
						onChange={handleChange}
						required
					/>
					<input type="checkbox" required name="rgpd" id="rgpd" />
					<label htmlFor="rgpd">J'accepte le RGPD</label>
					<button type="submit" className="linkButton">
						S'inscrire
					</button>
				</form>

				<div className="auth-links">
					<p>
						Vous avez déjà un compte ?{" "}
						<Link to="/login">Se connecter</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
