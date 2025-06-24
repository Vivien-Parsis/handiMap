import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { api_url } from "../../config/const";
import { Link, useNavigate } from "react-router";
import styles from "../../assets/css/account/account.module.css";
import { jwtDecode } from "jwt-decode";
import LinkBar from "../../components/linkBar";

const Account = () => {
	const hasAlerted = useRef(false);
	const [userInfo, setUserInfo] = useState({});
	const [userHandicaps, setUserHandicaps] = useState([]);
	const [allHandicaps, setAllHandicaps] = useState([]);
	const [newHandicap, setNewHandicap] = useState();
	const [showModifyName, setShowModifyName] = useState(false);
	const navigate = useNavigate();
	const jwt_token = localStorage.getItem("token");

	const disconnet = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};
	const handleDeleteHandicaps = async (id) => {
		try {
			await axios
				.delete(`${api_url}/api/v1/users/handicaps`, {
					data: { id_handicap: id },
					headers: { authorization: "Bearer " + jwt_token }
				})
				.then();
			await axios
				.get(`${api_url}/api/v1/users/handicaps`, {
					headers: { authorization: "Bearer " + jwt_token }
				})
				.then((res) => {
					if (res.data) {
						setUserHandicaps(res.data);
					}
				});
		} catch (err) {
			console.log(err);
			if (!hasAlerted.current) {
				alert("Erreur lors suppression handicap");
				hasAlerted.current = true;
			}
			localStorage.removeItem("token");
			navigate("/login");
		}
	};
	const handleAddHandicaps = async () => {
		if (!newHandicap) {
			return;
		}
		try {
			await axios
				.post(
					`${api_url}/api/v1/users/handicaps`,
					{ id_handicap: newHandicap },
					{ headers: { authorization: "Bearer " + jwt_token } }
				)
				.then(() => {
					alert("handicap ajouté");
				});
			await axios
				.get(`${api_url}/api/v1/users/handicaps`, {
					headers: { authorization: "Bearer " + jwt_token }
				})
				.then((res) => {
					if (res.data) {
						setUserHandicaps(res.data);
						setNewHandicap("");
					}
				});
		} catch (err) {
			console.log(err);
			if (!hasAlerted.current) {
				alert("Erreur lors ajout handicap");
				hasAlerted.current = true;
			}
			localStorage.removeItem("token");
			navigate("/login");
		}
	};
	const handleChangeSelectAddHandicaps = (e) => {
		setNewHandicap(e.target.value);
	};

	const handleDeleteAccount = async () => {
		if (
			confirm(
				"Etes vous sûr de supprimer votre compte ? toutes données lié a votre compte seront supprimer."
			)
		) {
			await axios
				.delete(`${api_url}/api/v1/users`, {
					headers: { authorization: "Bearer " + jwt_token }
				})
				.then((res) => {
					localStorage.removeItem("token");
					navigate("/");
				})
				.catch((err) => {
					alert("Erreur lors suppression du compte");
					localStorage.removeItem("token");
					navigate("/");
				});
		}
	};

	const showEtablissementBtn = () => {
		try {
			const decode = jwtDecode(jwt_token);
			if (decode.role === "admin" || decode.role === "owner") {
				return (
					<Link to="/account/etablissement" className="linkButton">
						Voir mes établissements
					</Link>
				);
			}
		} catch (err) {
			console.log("Error lors du décodage du jwt", err);
		}
	};

	const switchShowModifyName = () => {
		setShowModifyName(!showModifyName);
	};
	const handleModifyUser = async (e) => {
		e.preventDefault();
		await axios
			.put(
				`${api_url}/api/v1/users`,
				{
					nom: e.target.newNom.value,
					prenom: e.target.newPrenom.value
				},
				{ headers: { authorization: "Bearer " + jwt_token } }
			)
			.then(() => {
				setShowModifyName(false);
			});
		await axios
			.get(`${api_url}/api/v1/users/`, {
				headers: { authorization: "Bearer " + jwt_token }
			})
			.then((res) => {
				if (res.data) {
					setUserInfo(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
				if (!hasAlerted.current) {
					alert(
						"Erreur lors modification du compte, veuillez vous reconnecter"
					);
					hasAlerted.current = true;
				}
				localStorage.removeItem("token");
				navigate("/login");
			});
	};
	const getFormModifyName = () => {
		if (showModifyName) {
			return (
				<form
					className={styles.updateFormUser}
					onSubmit={handleModifyUser}
				>
					<label htmlFor="newNom">Nouveau nom : </label>
					<input
						type="text"
						name="newNom"
						id="newNom"
						required
						defaultValue={userInfo.nom}
					></input>
					<label htmlFor="newPrenom">Nouveau prenom : </label>
					<input
						type="text"
						name="newPrenom"
						id="newPrenom"
						required
						defaultValue={userInfo.prenom}
					></input>
					<input type="submit" className="linkButton"></input>
				</form>
			);
		}
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				await axios
					.get(`${api_url}/api/v1/users/`, {
						headers: { authorization: "Bearer " + jwt_token }
					})
					.then((res) => {
						if (res.data) {
							setUserInfo(res.data);
						}
					});
				await axios
					.get(`${api_url}/api/v1/users/handicaps`, {
						headers: { authorization: "Bearer " + jwt_token }
					})
					.then((res) => {
						if (res.data) {
							setUserHandicaps(res.data);
						}
					});
				await axios
					.get(`${api_url}/api/v1/handicaps`, {
						headers: { authorization: "Bearer " + jwt_token }
					})
					.then((res) => {
						if (res.data) {
							setAllHandicaps(res.data);
						}
					});
			} catch (err) {
				console.log(err);
				if (!hasAlerted.current) {
					alert(
						"Erreur lors recupération du compte, veuillez vous reconnecter"
					);
					hasAlerted.current = true;
				}
				localStorage.removeItem("token");
				navigate("/login");
				return;
			}
		};
		fetchUserData();
	}, []);
	return (
		<div className="backgroundBlured">
			<LinkBar link="/" text="Revenir sur la carte" />
			<div className={styles.accountContainer}>
				<h2>Mon compte</h2>
				<ul>
					<li>
						{userInfo.nom} {userInfo.prenom}{" "}
						<button
							className="linkButton"
							onClick={() => switchShowModifyName()}
						>
							modifier
						</button>
						{getFormModifyName()}
					</li>
					<li>{userInfo.email}</li>
				</ul>
				<button className="linkButton" onClick={() => disconnet()}>
					me deconnecter
				</button>
				<button
					className="deleteButton"
					onClick={() => handleDeleteAccount()}
				>
					Supprimer mon compte
				</button>
				<h3>Mes handicaps</h3>
				<ul>
					{userHandicaps.map((value) => {
						return (
							<li key={value.id_user_handicap}>
								{value.nom} | type : {value.type}{" "}
								<button
									className="deleteButton"
									onClick={() =>
										handleDeleteHandicaps(value.id_handicap)
									}
								>
									Supprimer
								</button>
							</li>
						);
					})}
				</ul>
				<div className={styles.addHandicap}>
					<div className={styles.selectHandicap}>
						<label htmlFor="addHandicap">
							Rajouter un handicape
						</label>
						<select
							onChange={handleChangeSelectAddHandicaps}
							id="addHandicap"
							value={newHandicap}
						>
							<option value="" disabled hidden>
								Choisisez ici
							</option>
							{allHandicaps.map((handicap) => {
								if (
									!userHandicaps.some(
										(el) =>
											el.id_handicap ===
											handicap.id_handicap
									)
								) {
									return (
										<option
											value={handicap.id_handicap}
											key={handicap.id_handicap}
										>
											{handicap.nom} (type :{" "}
											{handicap.type})
										</option>
									);
								} else {
									return "";
								}
							})}
						</select>
					</div>
					<button
						className="addButton"
						onClick={() => handleAddHandicaps()}
					>
						Ajouter
					</button>
				</div>
				<Link to="/account/avis" className="linkButton">
					Voir mes avis
				</Link>
				{showEtablissementBtn()}
			</div>
		</div>
	);
};

export default Account;
