import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../config/const";
import { Link, useNavigate, useLocation } from "react-router";
import TwoBtnBar from "../components/TwoButtonBar";
import styles from "../assets/css/etablissementAvisNew.module.css";
import etablissementPlaceholder from "../assets/images/etablissementplaceholder.jpg";
import StarBar from "../components/starBar";
import { getAvisAverage, getAvisNumber } from "../utils/note.js";

const EtablissementAvisNew = () => {
	const location = useLocation();
	const id_etablissement = location.state?.id_etablissement || "";
	const jwt_token = localStorage.getItem("token");

	const [etablisement, setEtablisement] = useState({});
	const [newAvis, setNewAvis] = useState({
		note: 0,
		commentaire: "",
		photo: "",
		id_etablissement: id_etablissement
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		if (e.target.name === "note" && e.target.value > 5) {
			setNewAvis({
				...newAvis,
				note: 5
			});
		} else if (e.target.name === "photo") {
			setNewAvis({
				...newAvis,
				photo: e.target.files[0]
			});
		} else {
			setNewAvis({
				...newAvis,
				[e.target.name]: e.target.value
			});
		}
	};

	const handleAddAvis = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("note", newAvis.note);
		formData.append("commentaire", newAvis.commentaire);
		formData.append("id_etablissement", newAvis.id_etablissement);
		formData.append("photo", newAvis.photo);
		await axios
			.post(`${api_url}/api/v1/users/avis`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					authorization: jwt_token
				}
			})
			.then(() => {
				navigate("/etablissement");
			})
			.catch((err) => {
				console.log("err");
			});
	};

	useEffect(() => {
		if (!id_etablissement) {
			navigate("/");
		} else {
			axios
				.get(`${api_url}/api/v1/etablissements/with-relations`, {
					params: {
						id_etablissement: id_etablissement
					}
				})
				.then((res) => {
					if (res.data) {
						setEtablisement(res.data);
					} else {
						navigate("/");
					}
				})
				.catch((err) => {
					navigate("/");
				});
		}
	}, [navigate, id_etablissement]);

	return (
		<div>
			<TwoBtnBar />
			<div className={styles.map}>
				<Link to="/" className="linkText">
					Revenir sur la carte
				</Link>
				<div className={styles.etablisementContainer}>
					<img
						alt="etablissement"
						className={styles.etablisementPhoto}
						src={
							etablisement.photo_etablissement ||
							etablissementPlaceholder
						}
					/>
					<span>
						<div className={styles.titleAndAvisContainer}>
							<div className={styles.infoContainer}>
								<h2>
									{etablisement.nom_etablissement ||
										"title generic"}
								</h2>
								<p>{etablisement.adresse}</p>
								<p>{etablisement.type_etablissement}</p>
							</div>
							<div className={styles.avisContainer}>
								<span>
									<StarBar note={Math.round(getAvisAverage(etablisement.avis))}/>
								</span>
								<span>
									{getAvisAverage(etablisement.avis)}/5 sur{" "}
									{getAvisNumber(etablisement.avis)} avis
								</span>
							</div>
						</div>
						<div className={styles.formContainer}>
							<h3>Nouveau avis</h3>
							<form onSubmit={handleAddAvis}>
								<label htmlFor="note">Note</label>
								<input
									id="note"
									type="number"
									min="0"
									max="5"
									step="1"
									name="note"
									value={newAvis.note}
									onChange={handleChange}
								></input>
								<label htmlFor="commentaire">Commentaire</label>
								<textarea
									id="commentaire"
									name="commentaire"
									className={styles.avisCommentaire}
									value={newAvis.commentaire}
									onChange={handleChange}
								></textarea>
								<label htmlFor="photo">photo</label>
								<input
									type="file"
									id="photo"
									name="photo"
									accept="image/*"
									onChange={handleChange}
								></input>
								<input type="submit" value="Envoyer"></input>
							</form>
						</div>
					</span>
				</div>
			</div>
		</div>
	);
};

export default EtablissementAvisNew;
