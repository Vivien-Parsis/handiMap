import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../config/const";
import { Link, useNavigate } from "react-router";
import styles from "../../assets/css/account/accountAvis.module.css";
import StarBar from "../../components/starBar";
import SearchBar from "../../components/searchBar";
import LinkBar from "../../components/linkBar";

const AccountAvis = () => {
  const [userAvis, setUserAvis] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const jwt_token = localStorage.getItem("token");
  const handleDeleteAvis = (id) => {
    const jwt_token = localStorage.getItem("token");
    axios
      .delete(`${api_url}/api/v1/users/avis`, {
        data: { id_avis: id },
        headers: { authorization: "Bearer " + jwt_token },
      })
      .then()
      .catch((err) => {
        alert("Erreur lors suppression avis, veuillez vous reconnecter");
        localStorage.removeItem("token");
        navigate("/login");
      });
    axios
      .get(`${api_url}/api/v1/users/avis`, {
        headers: { authorization: "Bearer " + jwt_token },
      })
      .then((res) => {
        if (res.data) {
          setUserAvis(res.data);
        }
      })
      .catch((err) => {
        alert("Erreur lors recupération des avis, veuillez vous reconnecter");
        localStorage.removeItem("token");
        navigate("/login");
      });
  };
  const getAvisPhoto = (avis) => {
    if (!avis) {
      return;
    } else if (!avis.photo_avis) {
      return;
    } else {
      return <img src={avis.photo_avis} alt="avis" />;
    }
  };
  useEffect(() => {
    const fetchUserAvis = async () => {
      await axios
        .get(`${api_url}/api/v1/users/avis`, {
          headers: { authorization: "Bearer " + jwt_token },
        })
        .then((res) => {
          if (res.data) {
            setUserAvis(res.data);
          }
        })
        .catch((err) => {
          alert("Erreur lors recupération des avis, veuillez vous reconnecter");
          localStorage.removeItem("token");
          navigate("/login");
        });
    };
    fetchUserAvis();
  }, [navigate]);

  return (
    <div className="backgroundBlured">
      <LinkBar link="/account" text="Revenir sur mon compte" />
      <h2>Mes avis</h2>
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
                      <Link
                        to={{
                          pathname: "/etablissement",
                          search: `?id_etablissement=${el.id_etablissement}`,
                        }}
                      >
                        Voir etablissement
                      </Link>{" "}
                      le {new Date(el.date).toLocaleDateString("fr-FR")}
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

export default AccountAvis;
