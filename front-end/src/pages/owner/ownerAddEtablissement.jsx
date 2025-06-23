import { useState } from "react";
import axios from "axios";
import { api_url } from "../../config/const";
import { useNavigate } from "react-router";
import styles from "../../assets/css/owner/ownerAddEtablissement.module.css";
import LinkBar from "../../components/linkBar";

const OwnerAddEtablissement = () => {
  const [newEtablissement, setNewEtablissement] = useState({
    nom: "",
    adresse: "",
    type: "",
    coordonnees: "",
    photo: null,
  });
  const navigate = useNavigate();

  const jwt_token = localStorage.getItem("token");

  const handleAddEtablissement = async () => {
    if (!newEtablissement) {
      alert("missing new etablissement");
      return;
    }
    if (
      !newEtablissement.nom ||
      !newEtablissement.adresse ||
      !newEtablissement.type ||
      !newEtablissement.coordonnees
    ) {
      alert("missing required field");
      return;
    }
    if (!/^-?\d+(\.\d+)?;-?\d+(\.\d+)?$/.test(newEtablissement.coordonnees)) {
      alert("format incorect pour les coordonées");
      return;
    }
    const formData = new FormData();
    formData.append("nom", newEtablissement.nom);
    formData.append("adresse", newEtablissement.adresse);
    formData.append("type", newEtablissement.type);
    formData.append("coordonnees", newEtablissement.coordonnees);
    formData.append("photo", newEtablissement.photo);
    await axios
      .post(`${api_url}/api/v1/owners/etablissements`, formData, {
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
        alert("erreur lors de l'ajout de l'etablissement");
        navigate("/login");
      });
  };
  const handleChange = (e) => {
    setNewEtablissement({
      ...newEtablissement,
      [e.target.name]: e.target.value,
    });
  };
  const handlePhotoChange = (e) => {
    setNewEtablissement({
      ...newEtablissement,
      photo: e.target.files[0],
    });
  };

  return (
    <div className="backgroundBlured">
      <LinkBar
        link="/account/etablissement"
        text="Revenir sur mes etablissements"
      />
      <div className={styles.FormAddEtablissement}>
        <h2>Rajouter un lieu</h2>
        <form>
          <label htmlFor="nom">nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={newEtablissement.nom}
            onChange={handleChange}
            required
          />
          <label htmlFor="type">type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={newEtablissement.type}
            onChange={handleChange}
            required
          />
          <label htmlFor="photo">photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/png, image/jpeg, image/webp"
            onChange={handlePhotoChange}
            required
          />
          <label htmlFor="adresse">adresse</label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={newEtablissement.adresse}
            onChange={handleChange}
            required
          />
          <label htmlFor="coordonnees">
            coordonnees (format : "lat;lon")
          </label>
          <input
            type="text"
            id="coordonnees"
            name="coordonnees"
            value={newEtablissement.coordonnees}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="linkButton"
            onClick={() => handleAddEtablissement()}
          >
            Rajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default OwnerAddEtablissement;
