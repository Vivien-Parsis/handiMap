import React, { useEffect, useState } from "react";
import styles from "../assets/css/map.module.css";
import TwoBtnBar from "../components/TwoButtonBar";
import { Link } from "react-router";
import axios from "axios";
import { api_url } from "../config/const";

const Maps = () => {
	const [etablisements, setEtablisements] = useState([]);
  
	useEffect(() => {
		axios.get(`${api_url}/etablissement`).then((res) => {
			if (res.data) {
				setEtablisements(res.data);
			}
		});
	}, []);
	return (
		<div>
			<TwoBtnBar />
			<div className={styles.map}>
				<Link
					to="/etablissement"
					state={{
						id_etablissement: etablisements[0]?.id_etablissement || ""
					}}
				>
					Voir etablissement {etablisements[0]?.nom || ""}
				</Link>
			</div>
		</div>
	);
};

export default Maps;
