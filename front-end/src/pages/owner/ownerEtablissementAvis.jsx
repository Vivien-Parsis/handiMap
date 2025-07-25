import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../config/const";
import { useLocation, useNavigate } from "react-router";
import styles from "../../assets/css/owner/ownerEtablissementAvis.module.css";
import StarBar from "../../components/starBar";
import SearchBar from "../../components/searchBar";
import LinkBar from "../../components/linkBar";
import PageTitle from "../../components/pageTitle";

const OwnerEtablissementAvis = () => {
  const [userAvis, setUserAvis] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const jwt_token = localStorage.getItem("token");

  const id_etablissement = location.state?.id_etablissement || "";
  const nom_etablissement = location.state?.nom_etablissement || "";
  const handleDeleteAvis = (id) => {
    axios
      .delete(`${api_url}/api/v1/owners/etablissements/avis`, {
        data: { id_avis: id, id_etablissement: id_etablissement },
        headers: { authorization: "Bearer " + jwt_token },
      })
      .then(() => {
        axios
          .get(`${api_url}/api/v1/owners/etablissements/avis`, {
            params: { id_etablissement },
            headers: { authorization: "Bearer " + jwt_token },
          })
          .then((res) => {
            if (res.data) {
              setUserAvis(res.data);
            }
          })
          .catch(() => {
            localStorage.removeItem("token");
            alert("erreur lors de la suppression avis");
            navigate("/login");
          });
      })
      .catch(() => {
        localStorage.removeItem("token");
        alert("erreur lors de la suppression avis");
        navigate("/login");
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
    if (!id_etablissement || !nom_etablissement) {
      navigate("/account/etablissement");
    } else {
      axios
        .get(`${api_url}/api/v1/owners/etablissements/avis`, {
          params: { id_etablissement: id_etablissement },
          headers: { authorization: "Bearer " + jwt_token },
        })
        .then((res) => {
          if (res.data) {
            setUserAvis(res.data);
          }
        })
        .catch((err) => {
          localStorage.removeItem("token");
          alert(
            "erreur lors de la recupération avis, veuillez vous reconnecter"
          );
          navigate("/login");
        });
    }
  }, [navigate, id_etablissement, nom_etablissement]);
  return (
    <div className="backgroundBlured">
      <PageTitle title={"Handi'Map - " + nom_etablissement + " - avis"} />
      <LinkBar
        link="/account/etablissement"
        text="Revenir sur mes etablissements"
      />
      <h2>Les avis de {nom_etablissement}</h2>
      <SearchBar
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className={styles.accountContainer}>
        <ul className={styles.avisContainer}>
          {userAvis.map((el) => {
            if (el.commentaire.toLowerCase().includes(search.toLowerCase())) {
              return (
                <li key={el.id_avis}>
                  <div>
                    <span>
                      <StarBar note={el.note} />
                    </span>
                    <p>{el.commentaire}</p>
                    {getAvisPhoto(el)}
                    <span className={styles.avisNotice}>
                      {el.avis} le{" "}
                      {new Date(el.date).toLocaleDateString("fr-FR")}
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
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default OwnerEtablissementAvis;
