import React, { useEffect, useState } from "react";
import styles from "../assets/css/map.module.css";
import TwoBtnBar from "../components/TwoButtonBar";
import { Link } from "react-router";
import axios from "axios";
import { api_url } from "../config/const.js";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Maps = () => {
	const [etablisements, setEtablisements] = useState([]);
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
			<Link
				to="/etablissement"
				state={{
					id_etablissement:
						etablisements[0]?.id_etablissement || ""
				}}
			>
				Voir etablissement {etablisements[0]?.nom || ""}
			</Link>
			<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} class={styles.mapLeaflet}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[51.505, -0.09]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default Maps;
