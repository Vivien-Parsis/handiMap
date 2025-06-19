import { useEffect, useState } from "react";
import styles from "../../assets/css/map/map.module.css";
import TwoBtnBar from "../../components/TwoButtonBar";
import axios from "axios";
import { api_url } from "../../config/const.js";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import MarkerGenerator from "../../components/markerGenerator.jsx";



const Maps = () => {
  const [etablisements, setEtablisements] = useState([]);

  useEffect(() => {
    axios
      .get(`${api_url}/api/v1/etablissements/all-with-relations`)
      .then((res) => {
        if (res.data) {
          setEtablisements(res.data);
        } else {
          alert("Erreur lors de la recuperations des etablissements");
        }
      })
      .catch(() => {
        alert("Erreur lors de la recuperations des etablissements");
      });
  }, []);
  return (
    <div>
      <TwoBtnBar />
      <MapContainer
        center={[48.78857099922142, 2.363715058956779]}
        zoom={13}
        className={styles.mapLeaflet}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomleft" />
        <MarkerGenerator etablisementsList={etablisements} />
      </MapContainer>
    </div>
  );
};

export default Maps;
