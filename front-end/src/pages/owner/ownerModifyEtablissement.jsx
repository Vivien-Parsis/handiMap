import { useState } from "react";
import axios from "axios";
import { api_url } from "../../config/const";
import { useNavigate, useLocation } from "react-router";
import styles from "../../assets/css/owner/ownerModifyEtablissement.module.css";
import LinkBar from "../../components/linkBar";

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
    if (!/^-?\d+(\.\d+)?;-?\d+(\.\d+)?$/.test(newEtablissement.coordonnees)) {
      alert("format incorrect pour les coordonnées");
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
          authorization: "Bearer " + jwt_token,
        },
      })
      .then(() => {
        navigate("/account/etablissement");
      })
      .catch((err) => {
        localStorage.removeItem("token");
        alert("erreur lors de la modif d'un etablissement");
        navigate("/login");
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
    <div className="backgroundBlured">
      <LinkBar
        link="/account/etablissement"
        text="Revenir sur mes etablissements"
      />
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
          <label htmlFor="coordonnees">
            coordonnees (format : "nombre;nombre")
          </label>
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
