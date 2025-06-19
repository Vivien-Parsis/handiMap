import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../config/const.js";
import { Link, useNavigate, useSearchParams } from "react-router";
import TwoBtnBar from "../../components/TwoButtonBar.jsx";
import styles from "../../assets/css/etablissement/etablissement.module.css";
import etablissementPlaceholder from "../../assets/images/etablissementplaceholder.jpg";
import StarBar from "../../components/starBar.jsx";
import { getAvisAverage, getAvisNumber } from "../../utils/note.js";
import { jwtDecode } from "jwt-decode";
import LinkBar from "../../components/linkBar.jsx";
import PageTitle from "../../components/pageTitle";

const Etablissement = () => {
  const [etablisement, setEtablisement] = useState({});
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id_etablissement = searchParams.get('id_etablissement') || "";

  const jwt_token = localStorage.getItem("token");

  const getImageAvis = (avis) => {
    if (!avis) {
      return;
    } else if (!avis.photo_avis) {
      return;
    } else {
      return <img src={avis.photo_avis} alt="avis" />;
    }
  };

  const getHandicaps = (handicaps) => {
    if (!handicaps) {
      return <p>Aucune informations sur l'acessibilité est disponible.</p>;
    }
    if (handicaps.length == 0) {
      return <p>Aucune informations sur l'acessibilité est disponible.</p>;
    }
    const content = [];
    for (let handi of handicaps) {
      content.push(
        <li key={handi.id_handicap}>
          {handi.nom_handicap} | type : {handi.type_handicap}
        </li>
      );
    }
    return content;
  };
  const getAvis = (avis) => {
    if (!avis) {
      return <p>Cet établissement n'a pas encore reçu d'avis.</p>;
    }
    if (avis.length == 0) {
      return <p>Cet établissement n'a pas encore reçu d'avis.</p>;
    }
    const content = [];
    for (let a of avis) {
      const currentDate = new Date(a.date);
      content.push(
        <div className={styles.avisListItem} key={a.id_avis}>
          <div>
            <span>
              <StarBar note={a.note} />
            </span>
            <span>{a.commentaire} </span>
            <span>
              de {a.nom_auteur_avis} {a.prenom_auteur_avis} le{" "}
              {currentDate.toLocaleDateString("fr-FR")}
            </span>
          </div>
          {getImageAvis(a)}
        </div>
      );
    }
    return content;
  };

  const showNewAvisLink = () => {
    try {
      const decode = jwtDecode(jwt_token);
      if (decode.role && decode.email && decode.id_user) {
        return (
          <Link
            to={{
              pathname: "/etablissement/avis/new",
              search: `?id_etablissement=${id_etablissement}`
            }}
          >
            Ecrire un avis
          </Link>
        );
      }
    } catch (err) {
      console.log("Error lors du décodage du jwt", err);
    }
  };

  useEffect(() => {
    if (!id_etablissement) {
      navigate("/");
    } else if(!(/^\d+$/.test(id_etablissement))){
      navigate("/");
    }else {
      axios
        .get(`${api_url}/api/v1/etablissements/with-relations`, {
          params: {
            id_etablissement: id_etablissement,
          },
        })
        .then((res) => {
          if (res.data) {
            setEtablisement(res.data);
          } else {
            alert("erreur lors de la recupération de l'etablissement");
            navigate("/");
          }
        })
        .catch((err) => {
          alert("erreur lors de la recupération de l'etablissement");
          navigate("/");
        });
    }
  }, [navigate, id_etablissement]);

  return (
    <div>
      <PageTitle title={"Handi'Map - " + etablisement.nom_etablissement}/>
      <TwoBtnBar />
      <div className="backgroundBluredCol">
      <LinkBar link="/" text="Revenir sur la carte" />
        <div className={styles.etablisementContainer}>
          <img
            alt={"etablissement" + etablisement.type_etablissement + " " + etablisement.nom_etablissement}
            className={styles.etablisementPhoto}
            src={etablisement.photo_etablissement || etablissementPlaceholder}
          />
          <span>
            <div className={styles.titleAndAvisContainer}>
              <div className={styles.infoContainer}>
                <h2>{etablisement.nom_etablissement || "title generic"}</h2>
                <p>{etablisement.adresse}</p>
                <p>{etablisement.type_etablissement}</p>
              </div>
              <div className={styles.avisContainer}>
                <span>
                  <StarBar
                    note={Math.round(getAvisAverage(etablisement.avis))}
                  />
                </span>
                <span>
                  {getAvisAverage(etablisement.avis)}/5 sur{" "}
                  {getAvisNumber(etablisement.avis)} avis
                </span>
                <span>{showNewAvisLink()}</span>
              </div>
            </div>
            <div className={styles.handicapContainer}>
              <h3>Handicaps</h3>
              <ul>{getHandicaps(etablisement.handicaps)}</ul>
            </div>
            <div className={styles.avisListContainer}>
              {getAvis(etablisement.avis)}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Etablissement;
