import React, { useState } from "react";
import axios from "axios";
import { api_url } from "../config/const";
import { Link, useNavigate, useLocation } from "react-router";
import styles from "../assets/css/ownerModifyEtablissement.module.css";

const OwnerModifyEtablissement = () => {
  const location = useLocation();
  const params = {
    id_etablissement: location.state.id_etablissement || "",
    nom: location.state.nom || "",
    adresse: location.state.adresse || "",
    type: location.state.type || "",
    coordonnees: location.state.coordonnees || "",
    photo: location.state.photo || "",
  };
  const [modifyEtablissement, setModifyEtablissement] = useState(params);
  const navigate = useNavigate();

  const jwt_token = localStorage.getItem("token");

  const handleModifyEtablissement = async () => {
    if (!modifyEtablissement) {
      return;
    }
    const formData = new FormData();
    formData.append("id_etablissement", modifyEtablissement.id_etablissement);
    formData.append("nom", modifyEtablissement.nom);
    formData.append("adresse", modifyEtablissement.adresse);
    formData.append("type", modifyEtablissement.type);
    formData.append("coordonnees", modifyEtablissement.coordonnees);
    formData.append("photo", modifyEtablissement.photo);
    await axios
      .put(`${api_url}/api/v1/owners/etablissements`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: jwt_token,
        },
      })
      .then(() => {
        navigate("/account/etablissement");
      })
      .catch((err) => {
        console.log("err");
      });
  };
  const handleChange = (e) => {
    setModifyEtablissement({
      ...modifyEtablissement,
      [e.target.name]: e.target.value,
    });
  };
  const handlePhotoChange = (e) => {
    setModifyEtablissement({
      ...modifyEtablissement,
      photo: e.target.files[0],
    });
  };

  return (
    <div className={styles.backgroundBlured}>
      <Link to="/account/etablissement">Revenir sur mes etablissements</Link>
      <div className={styles.FormModifyEtablissement}>
        <h2>Modifier un lieu</h2>
        <form>
          <label htmlFor="nom">nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={modifyEtablissement.nom}
            onChange={handleChange}
            required
          />
          <label htmlFor="type">type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={modifyEtablissement.type}
            onChange={handleChange}
            required
          />
          <label htmlFor="photo">photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            required
          />
          <label htmlFor="adresse">adresse</label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={modifyEtablissement.adresse}
            onChange={handleChange}
            required
          />
          <label htmlFor="coordonnees">coordonnees</label>
          <input
            type="text"
            id="coordonnees"
            name="coordonnees"
            value={modifyEtablissement.coordonnees}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="linkButton"
            onClick={() => handleModifyEtablissement()}
          >
            Rajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default OwnerModifyEtablissement;
