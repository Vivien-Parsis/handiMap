import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../config/const";
import { Link, useNavigate } from "react-router";
import styles from "../assets/css/ownerEtablissement.module.css";
import etablissementplaceholder from "../assets/images/etablissementplaceholder.jpg";
import StarBar from "../components/starBar";

const OwnerEtablissement = () => {
	const [ownerEtablisement, setOwnerEtablisement] = useState([]);
	const [allHandicaps, setAllHandicaps] = useState([]);
	const [newHandicap, setNewHandicap] = useState("");
	const navigate = useNavigate();

	const jwt_token = localStorage.getItem("token");
	const getAvisAverage = (avis) => {
		let average = 0;
		if (avis.length === 0) {
			return 0;
		}
		for (let a of avis) {
			average += a.note;
		}
		average = average / avis.length;
		if (average % 1 !== 0) {
			average = average.toFixed(3);
		}
		return average;
	};
	const getAvisNumber = (avis) => {
		return avis ? avis.length : 0;
	};

	const handleAddHandicaps = async (etablissement) => {
		if (!newHandicap) {
			return;
		}
		await axios
			.post(
				`${api_url}/api/v1/owner/etablissements/handicaps`,
				{ id_handicap: newHandicap, id_etablissement: etablissement },
				{ headers: { authorization: jwt_token } }
			)
			.then();
		await axios
			.get(`${api_url}/api/v1/owner/etablissements`, {
				headers: { authorization: jwt_token }
			})
			.then((res) => {
				if (res.data) {
					setOwnerEtablisement(res.data);
				} else {
					navigate("/login");
				}
			})
			.catch((err) => {
				navigate("/login");
			});
	};
	const handleDeleteEtablissement = async (id_etablissement) => {
		if (!id_etablissement) {
			return;
		}
		await axios
			.delete(`${api_url}/api/v1/owner/etablissements`, {
				data: { id_etablissement: id_etablissement },
				headers: {
					authorization: jwt_token
				}
			})
			.then(() => {})
			.catch((err) => {
				console.log("err");
			});
		await axios
			.get(`${api_url}/api/v1/owner/etablissements`, {
				headers: { authorization: jwt_token }
			})
			.then((res) => {
				if (res.data) {
					setOwnerEtablisement(res.data);
				} else {
					navigate("/login");
				}
			})
			.catch((err) => {
				navigate("/login");
			});
	};
	const handleDeleteHandicaps = async (handicap, etablissement) => {
		await axios
			.delete(`${api_url}/api/v1/owner/etablissements/handicaps`, {
				data: {
					id_handicap: handicap,
					id_etablissement: etablissement
				},
				headers: { authorization: jwt_token }
			})
			.then((res) => {});
		await axios
			.get(`${api_url}/api/v1/owner/etablissements`, {
				headers: { authorization: jwt_token }
			})
			.then((res) => {
				if (res.data) {
					setOwnerEtablisement(res.data);
				} else {
					navigate("/login");
				}
			})
			.catch((err) => {
				navigate("/login");
			});
	};
	const handleChangeSelectAddHandicaps = (e) => {
		e.preventDefault();
		setNewHandicap(e.target.value);
	};
	useEffect(() => {
		axios
			.get(`${api_url}/api/v1/owner/etablissements`, {
				headers: { authorization: jwt_token }
			})
			.then((res) => {
				if (res.data) {
					setOwnerEtablisement(res.data);
				} else {
					navigate("/login");
				}
			})
			.catch((err) => {
				navigate("/login");
			});
		axios
			.get(`${api_url}/api/v1/handicaps`, {
				headers: { authorization: jwt_token }
			})
			.then((res) => {
				if (res.data) {
					setAllHandicaps(res.data);
				} else {
					navigate("/login");
				}
			})
			.catch((err) => {
				navigate("/login");
			});
	}, [navigate, jwt_token]);
	return (
		<div>
			<div className={styles.backgroundBlured}>
				<Link to="/account" className="linkText">
					Revenir sur mon compte
				</Link>
				<div className={styles.ownerContainer}>
					<h2>Mes etablissements</h2>
					{ownerEtablisement.map((et) => {
						return (
							<div
								className={styles.etablissementsContainer}
								key={et.id_etablissement}
							>
								<img
									className={styles.etablissementsPhoto}
									src={
										et.photo_etablissement
											? et.photo_etablissement
											: etablissementplaceholder
									}
									alt={
										"photo etablissement " +
										et.nom_etablissement
									}
								/>
								<span>
									<h3>{et.nom_etablissement}</h3>
									<p>{et.adresse}</p>
									<p>{et.type_etablissement}</p>
									<StarBar note={Math.round(getAvisAverage(et.avis))}/>
									<p>
										{getAvisAverage(et.avis)} sur{" "}
										{getAvisNumber(et.avis)} avis
									</p>
									<Link
										className="linkButton"
										to="/account/etablissement/avis"
										state={{
											id_etablissement:
												et.id_etablissement,
											nom_etablissement:
												et.nom_etablissement
										}}
									>
										Voir les avis
									</Link>
									<div>
										<Link
											className="linkButton"
											to="/account/etablissement/modify"
											state={{
												id_etablissement:
													et.id_etablissement,
												nom: et.nom_etablissement,
												adresse: et.adresse,
												type: et.type_etablissement,
												coordonnees: et.coordonnees,
												photo: et.photo_etablissement
											}}
										>
											Modifier
										</Link>
										<button
											className="deleteButton"
											onClick={() =>
												handleDeleteEtablissement(
													et.id_etablissement
												)
											}
										>
											Supprimer
										</button>
									</div>
								</span>
								<span>
									<h3>Handicaps</h3>
									{et.handicaps.map((ha) => {
										return (
											<p
												className={styles.handicapsLine}
												key={ha.id_handicap}
											>
												{ha.nom_handicap}
												<button
													className="deleteButton"
													onClick={() =>
														handleDeleteHandicaps(
															ha.id_handicap,
															et.id_etablissement
														)
													}
												>
													Supprimer
												</button>
											</p>
										);
									})}
									<label htmlFor="addHandicap">
										Rajouter un handicape
									</label>
									<select
										onChange={
											handleChangeSelectAddHandicaps
										}
										id="addHandicap"
										defaultValue=""
										className={styles.Selecthandicaps}
									>
										<option value="" disabled hidden>
											Choisisez ici
										</option>
										{allHandicaps.map((handicap) => {
											if (
												!et.handicaps.some(
													(el) =>
														el.id_handicap ===
														handicap.id_handicap
												)
											) {
												return (
													<option
														value={
															handicap.id_handicap
														}
														key={
															handicap.id_handicap
														}
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

									<button
										className="addButton"
										onClick={() =>
											handleAddHandicaps(
												et.id_etablissement
											)
										}
									>
										Ajouter
									</button>
								</span>
							</div>
						);
					})}
				</div>
				<Link className="linkButton" to="/account/etablissement/add">
					Rajouter un etablissement
				</Link>
			</div>
		</div>
	);
};

export default OwnerEtablissement;
