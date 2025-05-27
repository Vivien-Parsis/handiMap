import React, { useEffect, useState } from "react";
import styles from "../assets/css/map.module.css";
import TwoBtnBar from "../components/TwoButtonBar";
import { Link } from "react-router";
import axios from "axios";
import { api_url } from "../config/const.js";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Maps = () => {
	const [etablisements, setEtablisements] = useState([]);
	const villejuif = [48.78857099922142, 2.363715058956779]

	const forMarker = (etablisementsList) => {
		content = []
		if(!etablisementsList){
			return
		}
		for(let et of etablisementsList){
			const currentCoordonnees = et.coordonnees ? et.coordonnees.includes(";") ? [et.coordonnees.split(";")[0],et.coordonnees.split(";")[1]] : villejuif : villejuif
			content.push(<Marker position={currentCoordonne}>
					<Popup>
						<h3>{et.nom || ""}</h3>					
						<Link
							to="/etablissement"
							state={{ id_etablissement : et.id_etablissement || "" }}
						>
							Voir etablissement 
						</Link>
					</Popup>
				</Marker>)
		}
		return content
	}

	useEffect(() => {
		axios.get(`${api_url}/api/v1/etablissements`).then((res) => {
			if (res.data) {
				setEtablisements(res.data);
			}
		});
	}, []);
	return (
		<div>
			<TwoBtnBar />
			<MapContainer center={villejuif} zoom={13} scrollWheelZoom={false} className={styles.mapLeaflet}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{forMarker(etablisement)}
			</MapContainer>
		</div>
	);
};

export default Maps;
