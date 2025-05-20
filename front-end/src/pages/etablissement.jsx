import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../config/const";
import { Link, useNavigate, useLocation } from "react-router";
import TwoBtnBar from "../components/TwoButtonBar";
import styles from "../assets/css/etablissement.module.css";
import { ReactComponent as Star } from "../assets/images/star-svgrepo-com.svg";
import etablissementPlaceholder from "../assets/images/etablissementplaceholder.jpg";

const Etablissement = () => {
	const [etablisement, setEtablisement] = useState({});
	const location = useLocation();
	const id_etablissement = location.state.id_etablissement || "";
	const navigate = useNavigate();

	const jwt_token = localStorage.getItem("token");
	const forStars = (note) => {
		let content = [];
		for (let i = 0; i < note; i++) {
			content.push(<Star className={styles.startIcon} />);
		}
		return content;
	};

	const getAvisAverage = (avis) => {
		let average = 0;
		if (!avis) {
			return;
		}
		if (avis.length === 0) {
			return 0;
		}
		for (let a of avis) {
			average += a.note;
		}
		return average / avis.length;
	};
	const getAvisNumber = (avis) => {
		return avis ? avis.length : 0;
	};

	const getHandicaps = (handicaps) => {
		if (!handicaps) {
			return;
		}
		const content = [];
		for (let handi of handicaps) {
			content.push(
				<li key={handi.id_handicap}>
					{handi.nom_handicap} | type : {handi.type_handicap}
				</li>
			);
		}
		return content;
	};
	const getAvis = (avis) => {
		if (!avis) {
			return;
		}
		const content = [];
		for (let a of avis) {
			const currentDate = new Date(a.date);
			content.push(
				<div className={styles.avisListItem} key={a.id_avis}>
					<span>{forStars(a.note)}</span>
					<span>{a.commentaire}</span>
					<span>
						de {a.nom_auteur_avis} {a.prenom_auteur_avis} le{" "}
						{currentDate.toLocaleDateString("fr-FR")}
					</span>
				</div>
			);
		}
		return content;
	};
	useEffect(() => {
		axios
			.get(`${api_url}/etablissement/findwithjoin`, {
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
	}, [navigate, jwt_token, id_etablissement]);

	return (
		<div>
			<TwoBtnBar />
			<div className={styles.map}>
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
									{forStars(
										Math.round(
											getAvisAverage(etablisement.avis)
										)
									)}
								</span>
								<span>
									{getAvisAverage(etablisement.avis)}/5 sur{" "}
									{getAvisNumber(etablisement.avis)} avis
								</span>
								<span>
									<Link
										to="/etablissements/avis/new"
										state={{
											id_etablissement: id_etablissement
										}}
									>
										Ecrire un avis
									</Link>
								</span>
							</div>
						</div>
						<div className={styles.handicapContainer}>
							<h3>Handicaps</h3>
							<ul>{getHandicaps(etablisement.handicaps)}</ul>
						</div>
						<div className={styles.avisListContainer}>
							{getAvis(etablisement.avis)}
						</div>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Etablissement;
