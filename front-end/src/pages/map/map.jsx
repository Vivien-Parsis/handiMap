import React, { useEffect, useState } from "react";
import styles from "../../assets/css/map/map.module.css";
import TwoBtnBar from "../../components/TwoButtonBar";
import { Link } from "react-router";
import axios from "axios";
import { api_url } from "../../config/const.js";
import leaflet from "leaflet";
import redPinImg from "../../assets/images/pin-red.png";
import StarBar from "../../components/starBar";
import placeholderEtablissement from "../../assets/images/etablissementplaceholder.jpg";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import { getAvisAverage, getAvisNumber } from "../../utils/note.js";

const Maps = () => {
  const [etablisements, setEtablisements] = useState([]);
  const villejuif = [48.78857099922142, 2.363715058956779];
  const redPin = leaflet.icon({
    iconUrl: redPinImg,
    iconSize: [30, 30],
    popupAnchor: [0, 0],
  });

  const forMarker = (etablisementsList) => {
    let content = [];
    if (!etablisementsList) {
      return;
    }
    for (let et of etablisementsList) {
      let currentCoordonnees = villejuif;
      if (et.coordonnees) {
        if (et.coordonnees.includes(";")) {
          currentCoordonnees = [
            et.coordonnees.split(";")[0],
            et.coordonnees.split(";")[1],
          ];
        }
      }
      content.push(
        <Marker
          position={currentCoordonnees}
          key={et.id_etablissement}
          icon={redPin}
        >
          <Popup className={styles.popupEtablissement}>
            <h3>{et.nom_etablissement || ""}</h3>
            <div className={styles.infoPopupEtablissement}>
              <img
                src={et.photo_etablissement || placeholderEtablissement}
                alt="etablissement"
              />
              <div>
                <p>
                  {et.adresse}
                  <br />
                  {et.type_etablissement}
                </p>
                <span>
                  <StarBar note={Math.floor(getAvisAverage(et.avis))} />
                  <p>
                    {getAvisAverage(et.avis)}/5 sur {getAvisNumber(et.avis)}{" "}
                    avis
                  </p>
                </span>
                <Link
                  to="/etablissement"
                  state={{
                    id_etablissement: et.id_etablissement || "",
                  }}
                >
                  Voir etablissement
                </Link>
              </div>
            </div>
          </Popup>
        </Marker>
      );
    }
    return content;
  };

  useEffect(() => {
    axios
      .get(`${api_url}/api/v1/etablissements/all-with-relations`)
      .then((res) => {
        if (res.data) {
          setEtablisements(res.data);
        }
      });
  }, []);
  return (
    <div>
      <TwoBtnBar />
      <MapContainer
        center={villejuif}
        zoom={13}
        className={styles.mapLeaflet}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomleft" />
        {forMarker(etablisements)}
      </MapContainer>
    </div>
  );
};

export default Maps;
