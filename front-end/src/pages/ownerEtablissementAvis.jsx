import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../config/const";
import { Link, useLocation, useNavigate } from "react-router";
import styles from "../assets/css/ownerEtablissementAvis.module.css";
import StarBar from "../components/starBar";
import SearchBar from "../components/searchBar";

const OwnerEtablissementAvis = () => {
  const [userAvis, setUserAvis] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const id_etablissement = location.state?.id_etablissement || "";
  const nom_etablissement = location.state?.nom_etablissement || "";
  const handleDeleteAvis = (id) => {
    const jwt_token = localStorage.getItem("token");

    axios
      .delete(`${api_url}/api/v1/owners/etablissements/avis`, {
        data: { id_avis: id, id_etablissement: id_etablissement },
        headers: { authorization: jwt_token },
      })
      .then(() => {
        axios
          .get(`${api_url}/api/v1/owners/etablissements/avis`, {
            params: { id_etablissement },
            headers: { authorization: jwt_token },
          })
          .then((res) => {
            if (res.data) {
              setUserAvis(res.data);
            }
          })
          .catch(() => {
            navigate("/login");
          });
      })
      .catch(() => {
        console.log("err");
      });
  };
  const getAvisPhoto = (avis) => {
    if (!avis) {
      return;
    } else if (!avis.photo_avis) {
      return;
    } else {
      return (
        <img src={avis.photo_avis} className={styles.photoAvis} alt="avis" />
      );
    }
  };
  useEffect(() => {
    const jwt_token = localStorage.getItem("token");
    if (!id_etablissement || !nom_etablissement) {
      navigate("/account/etablissement");
    } else {
      axios
        .get(`${api_url}/api/v1/owners/etablissements/avis`, {
          params: { id_etablissement: id_etablissement },
          headers: { authorization: jwt_token },
        })
        .then((res) => {
          if (res.data) {
            setUserAvis(res.data);
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          navigate("/login");
        });
    }
  }, [navigate, id_etablissement, nom_etablissement]);
  return (
    <div className="backgroundBlured">
      <Link to="/account/etablissement" className="linkText">
        Revenir sur mes etablissements
      </Link>
      <h2>Les avis de {nom_etablissement}</h2>
      <SearchBar />
      <div className={styles.accountContainer}>
        <ul className={styles.avisContainer}>
          {userAvis.map((el) => {
            return (
              <li key={el.id_avis}>
                <div>
                  <span>
                    <StarBar note={el.note} />
                  </span>
                  <p>{el.commentaire}</p>
                  {getAvisPhoto(el)}
                  <span className={styles.avisNotice}>
                    {el.avis} le {new Date(el.date).toLocaleDateString("fr-FR")}
                  </span>
                  <button
                    className="deleteButton"
                    onClick={() => handleDeleteAvis(el.id_avis)}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OwnerEtablissementAvis;
