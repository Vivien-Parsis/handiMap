import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../config/const";
import { Link, useNavigate } from "react-router";
import styles from "../assets/css/accountAvis.module.css";
import starIcon from "../assets/images/star-svgrepo-com.svg";

const AccountAvis = () => {
  const [userAvis, setUserAvis] = useState([]);
  const navigate = useNavigate();
  const forStars = (note) => {
    let content = [];
    for (let i = 0; i < note; i++) {
      content.push(<img src={starIcon} alt="Star avis" key={i} />);
    }
    return content;
  };
  const handleDeleteAvis = (id) => {
    const jwt_token = localStorage.getItem("token");
    axios
      .delete(`${api_url}/api/v1/users/avis`, {
        data: { id_avis: id },
        headers: { authorization: jwt_token },
      })
      .then((res) => {});
    axios
      .get(`${api_url}/api/v1/users/avis`, {
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
    const jwt_token = localStorage.getItem("token");
    axios
      .get(`${api_url}/api/v1/users/avis`, {
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
  }, [navigate]);
  return (
    <div className={styles.backgroundBlured}>
      <Link to="/account" className="linkText">
        Revenir sur mon compte
      </Link>
      <div className={styles.accountContainer}>
        <h2>Mes avis</h2>
        <ul className={styles.avisContainer}>
          {userAvis.map((el) => {
            return (
              <li key={el.id_avis}>
                <div>
                  <span>{forStars(el.note)}</span>
                  <p>{el.commentaire}</p>
                  <span className={styles.avisNotice}>
                    <Link
                      to={"/etablissement"}
                      state={{
                        id_etablissement: el.id_etablissement,
                      }}
                    >
                      {el.nom_etablissement}
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
                {getAvisPhoto(el)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AccountAvis;
