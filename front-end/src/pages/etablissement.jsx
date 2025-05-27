import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../config/const";
import { Link, useNavigate, useLocation } from "react-router";
import TwoBtnBar from "../components/TwoButtonBar";
import styles from "../assets/css/etablissement.module.css";
import etablissementPlaceholder from "../assets/images/etablissementplaceholder.jpg";
import starBar from "../components/starBar";

const Etablissement = () => {
	const [etablisement, setEtablisement] = useState({});
	const location = useLocation();

	const id_etablissement = location.state?.id_etablissement || "";
	const navigate = useNavigate();

	const getImageAvis = (avis) => {
		if (!avis) {
			return;
		} else if (!avis.photo_avis) {
			return;
		} else {
			return <img src={avis.photo_avis} alt="avis" />;
		}
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
					<div>
						<span><starBar note={a.note}/></span>
						<span>{a.commentaire} </span>
						<span>
							de {a.nom_auteur_avis} {a.prenom_auteur_avis} le{" "}
							{currentDate.toLocaleDateString("fr-FR")}
						</span>
					</div>
					{getImageAvis(a)}
				</div>
			);
		}
		return content;
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
									<starBar note={Math.round(getAvisAverage(etablisement.avis))}/>
								</span>
								<span>
									{getAvisAverage(etablisement.avis)}/5 sur{" "}
									{getAvisNumber(etablisement.avis)} avis
								</span>
								<span>
									<Link
										to="/etablissement/avis/new"
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
