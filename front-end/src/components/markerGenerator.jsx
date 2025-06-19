import { useState } from "react";
import styles from "./../assets/css/map/map.module.css";
import leaflet from "leaflet";
import redPinImg from "./../assets/images/pin-red.png";
import StarBar from "./starBar";
import placeholderEtablissement from "./../assets/images/etablissementplaceholder.jpg";
import { Link } from "react-router";
import { getAvisAverage, getAvisNumber } from "./../utils/note.js";
import { Marker, Popup, useMapEvent } from "react-leaflet";

const MarkerGenerator = ({ etablisementsList }) => {
  const [zoom, setZoom] = useState(13);
  const redPin = leaflet.icon({
    iconUrl: redPinImg,
    iconSize: [30, 30],
    popupAnchor: [0, 0],
  });
  useMapEvent("zoom", (e) => {
    setZoom(e.target.getZoom());
  });
  if (zoom <= 11) {
    return;
  }
  let content = [];
  if (!etablisementsList) {
    return;
  }
  for (let et of etablisementsList) {
    let currentCoordonnees = [48.78857099922142, 2.363715058956779];
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
              alt={
                "etablissement " +
                et.type_etablissement +
                " " +
                et.nom_etablissement
              }
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
                  {getAvisAverage(et.avis)}/5 sur {getAvisNumber(et.avis)} avis
                </p>
              </span>
              <Link
                to={{
                  pathname: "/etablissement",
                  search: `?id_etablissement=${et.id_etablissement}`,
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

export default MarkerGenerator;
