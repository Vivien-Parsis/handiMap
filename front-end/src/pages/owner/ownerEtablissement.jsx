import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { api_url } from "../../config/const.js";
import { Link, useNavigate } from "react-router";
import styles from "../../assets/css/owner/ownerEtablissement.module.css";
import etablissementplaceholder from "../../assets/images/etablissementplaceholder.jpg";
import StarBar from "../../components/starBar.jsx";
import { getAvisAverage, getAvisNumber } from "../../utils/note.js";
import SearchBar from "../../components/searchBar.jsx";
import LinkBar from "../../components/linkBar.jsx";

const OwnerEtablissement = () => {
  const hasAlerted = useRef(false);
  const [ownerEtablisement, setOwnerEtablisement] = useState([]);
  const [allHandicaps, setAllHandicaps] = useState([]);
  const [newHandicap, setNewHandicap] = useState("");
  const navigate = useNavigate();

  const jwt_token = localStorage.getItem("token");

  const handleAddHandicaps = async (etablissement) => {
    if (!newHandicap) {
      return;
    }
    await axios
      .post(
        `${api_url}/api/v1/owners/etablissements/handicaps`,
        { id_handicap: newHandicap, id_etablissement: etablissement },
        { headers: { authorization: "Bearer " + jwt_token } }
      )
      .then()
      .catch((err) => {
        localStorage.removeItem("token");
        alert("erreur lors de la ajout handicap, veuillez vous reconnecter");
        navigate("/login");
      });
    await axios
      .get(`${api_url}/api/v1/owners/etablissements`, {
        headers: { authorization: "Bearer " + jwt_token },
      })
      .then((res) => {
        if (res.data) {
          setOwnerEtablisement(res.data);
          setNewHandicap("");
        } else {
          localStorage.removeItem("token");
          alert("erreur lors de la ajout handicap, veuillez vous reconnecter");
          navigate("/login");
        }
      })
      .catch((err) => {
        localStorage.removeItem("token");
        alert("erreur lors de la ajout handicap, veuillez vous reconnecter");
        navigate("/login");
      });
  };
  const handleDeleteEtablissement = async (id_etablissement) => {
    if (!id_etablissement) {
      return;
    }
    await axios
      .delete(`${api_url}/api/v1/owners/etablissements`, {
        data: { id_etablissement: id_etablissement },
        headers: {
          authorization: "Bearer " + jwt_token,
        },
      })
      .then()
      .catch((err) => {
        localStorage.removeItem("token");
        alert(
          "erreur lors de la suppression etablissement, veuillez vous reconnecter"
        );
        navigate("/login");
      });
    await axios
      .get(`${api_url}/api/v1/owners/etablissements`, {
        headers: { authorization: "Bearer " + jwt_token },
      })
      .then((res) => {
        if (res.data) {
          setOwnerEtablisement(res.data);
        } else {
          localStorage.removeItem("token");
          alert(
            "erreur lors de la suppression etablissement, veuillez vous reconnecter"
          );
          navigate("/login");
        }
      })
      .catch((err) => {
        localStorage.removeItem("token");
        alert(
          "erreur lors de la suppression etablissement, veuillez vous reconnecter"
        );
        navigate("/login");
      });
  };
  const handleDeleteHandicaps = async (handicap, etablissement) => {
    await axios
      .delete(`${api_url}/api/v1/owners/etablissements/handicaps`, {
        data: {
          id_handicap: handicap,
          id_etablissement: etablissement,
        },
        headers: { authorization: "Bearer " + jwt_token },
      })
      .then()
      .catch((err) => {
        localStorage.removeItem("token");
        alert("erreur lors de la suppression handicap");
        navigate("/login");
      });
    await axios
      .get(`${api_url}/api/v1/owners/etablissements`, {
        headers: { authorization: "Bearer " + jwt_token },
      })
      .then((res) => {
        if (res.data) {
          setOwnerEtablisement(res.data);
        }
      })
      .catch((err) => {
        localStorage.removeItem("token");
        alert(
          "erreur lors de la recuperation etablissement, veuillez vous reconnecter"
        );
        navigate("/login");
      });
  };
  const handleChangeSelectAddHandicaps = (e) => {
    e.preventDefault();
    setNewHandicap(e.target.value);
  };
  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        await axios
          .get(`${api_url}/api/v1/owners/etablissements`, {
            headers: { authorization: "Bearer " + jwt_token },
          })
          .then((res) => {
            if (res.data) {
              setOwnerEtablisement(res.data);
            }
          });
        await axios
          .get(`${api_url}/api/v1/handicaps`, {
            headers: { authorization: "Bearer " + jwt_token },
          })
          .then((res) => {
            if (res.data) {
              setAllHandicaps(res.data);
            }
          });
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        if (!hasAlerted.current) {
          alert(
            "erreur lors de la recuperation etablissement, veuillez vous reconnecter"
          );
          hasAlerted.current = true;
        }
        navigate("/login");
      }
    };
    fetchOwnerData();
  }, [navigate, jwt_token]);
  return (
    <div>
      <div className="backgroundBluredCol">
        <LinkBar link="/account" text="Revenir sur mon compte" />
        <div className={styles.ownerContainer}>
          <h2>Mes etablissements</h2>
          <SearchBar />
          <Link className="linkButton" to="/account/etablissement/add">
            Rajouter un etablissement
          </Link>
          {ownerEtablisement.map((et) => {
            return (
              <div
                className={styles.etablissementsContainer}
                key={et.id_etablissement}
              >
                <img
                  className={styles.etablissementsPhoto}
                  src={
                    et.photo_etablissement
                      ? et.photo_etablissement
                      : etablissementplaceholder
                  }
                  alt={"photo etablissement " + et.nom_etablissement}
                />
                <span>
                  <h3>{et.nom_etablissement}</h3>
                  <p>{et.adresse}</p>
                  <p>{et.type_etablissement}</p>
                  <StarBar note={Math.round(getAvisAverage(et.avis))} />
                  <p>
                    {getAvisAverage(et.avis)} sur {getAvisNumber(et.avis)} avis
                  </p>
                  <Link
                    className="linkButton"
                    to="/account/etablissement/avis"
                    state={{
                      id_etablissement: et.id_etablissement,
                      nom_etablissement: et.nom_etablissement,
                    }}
                  >
                    Voir les avis
                  </Link>
                  <div>
                    <Link
                      className="linkButton"
                      to="/account/etablissement/modify"
                      state={{
                        id_etablissement: et.id_etablissement,
                        nom: et.nom_etablissement,
                        adresse: et.adresse,
                        type: et.type_etablissement,
                        coordonnees: et.coordonnees,
                        photo: et.photo_etablissement,
                      }}
                    >
                      Modifier
                    </Link>
                    <button
                      className="deleteButton"
                      onClick={() =>
                        handleDeleteEtablissement(et.id_etablissement)
                      }
                    >
                      Supprimer
                    </button>
                  </div>
                </span>
                <span>
                  <h3>Handicaps</h3>
                  {et.handicaps.map((ha) => {
                    return (
                      <p className={styles.handicapsLine} key={ha.id_handicap}>
                        {ha.nom_handicap}
                        <button
                          className="deleteButton"
                          onClick={() =>
                            handleDeleteHandicaps(
                              ha.id_handicap,
                              et.id_etablissement
                            )
                          }
                        >
                          Supprimer
                        </button>
                      </p>
                    );
                  })}
                  <label htmlFor={"addHandicap" + et.id_etablissement}>
                    Rajouter un handicape
                  </label>
                  <select
                    onChange={handleChangeSelectAddHandicaps}
                    id={"addHandicap" + et.id_etablissement}
                    value={newHandicap}
                    className={styles.Selecthandicaps}
                  >
                    <option value="" disabled hidden>
                      Choisisez ici
                    </option>
                    {allHandicaps.map((handicap) => {
                      if (
                        !et.handicaps.some(
                          (el) => el.id_handicap === handicap.id_handicap
                        )
                      ) {
                        return (
                          <option
                            value={handicap.id_handicap}
                            key={handicap.id_handicap}
                          >
                            {handicap.nom} (type : {handicap.type})
                          </option>
                        );
                      } else {
                        return "";
                      }
                    })}
                  </select>
                  <button
                    className="addButton"
                    onClick={() => handleAddHandicaps(et.id_etablissement)}
                  >
                    Ajouter un handicap
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OwnerEtablissement;
