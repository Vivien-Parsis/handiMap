import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../config/const";
import { Link, useNavigate } from "react-router";
import styles from "../assets/css/account.module.css";
import { jwtDecode } from "jwt-decode";

const Account = () => {
	const [userInfo, setUserInfo] = useState({});
	const [userHandicaps, setUserHandicaps] = useState([]);
	const [allHandicaps, setAllHandicaps] = useState([]);
	const [newHandicap, setNewHandicap] = useState();
	const navigate = useNavigate();
	const jwt_token = localStorage.getItem("token");

	const disconnet = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};
	const handleDeleteHandicaps = (id) => {
		axios
			.delete(`${api_url}/api/v1/users/handicaps`, {
				data: { id_handicap: id },
				headers: { authorization: jwt_token }
			})
			.then((res) => {});
		axios
			.get(`${api_url}/api/v1/users/handicaps`, {
				headers: { authorization: jwt_token }
			})
			.then((res) => {
				if (res.data) {
					setUserHandicaps(res.data);
				} else {
					navigate("/login");
				}
			})
			.catch((err) => {
				navigate("/login");
			});
	};
	const handleAddHandicaps = async () => {
		if (!newHandicap) {
			return;
		}
		await axios
			.post(
				`${api_url}/api/v1/users/handicaps`,
				{ id_handicap: newHandicap },
				{ headers: { authorization: jwt_token } }
			)
			.then();
		await axios
			.get(`${api_url}/api/v1/users/handicaps`, {
				headers: { authorization: jwt_token }
			})
			.then((res) => {
				if (res.data) {
					setUserHandicaps(res.data);
				} else {
					navigate("/login");
				}
			})
			.catch((err) => {
				navigate("/login");
			});
	};
	const handleChangeSelectAddHandicaps = (e) => {
		e.preventDefault();
		setNewHandicap(e.target.value);
	};
	const showEtablissementBtn = () => {
		if (
			jwtDecode(jwt_token).role === "admin" ||
			jwtDecode(jwt_token).role === "owner"
		) {
			return (
				<Link to="/account/etablissement" className="linkButton">
					Voir mes établissements
				</Link>
			);
		}
	};
	useEffect(() => {
		axios
			.get(`${api_url}/api/v1/users/`, {
				headers: { authorization: jwt_token }
			})
			.then((res) => {
				if (res.data) {
					setUserInfo(res.data);
				} else {
					navigate("/login");
				}
			})
			.catch((err) => {
				navigate("/login");
			});
		axios
			.get(`${api_url}/api/v1/users/handicaps`, {
				headers: { authorization: jwt_token }
			})
			.then((res) => {
				if (res.data) {
					setUserHandicaps(res.data);
				} else {
					navigate("/login");
				}
			})
			.catch((err) => {
				navigate("/login");
			});
		axios
			.get(`${api_url}/api/v1/handicaps`, {
				headers: { authorization: jwt_token }
			})
			.then((res) => {
				if (res.data) {
					setAllHandicaps(res.data);
				} else {
					navigate("/login");
				}
			})
			.catch((err) => {
				navigate("/login");
			});
	}, [navigate, jwt_token]);
	return (
    <div className="backgroundBlured">
      <Link to="/" className="linkText">
        Revenir sur la carte
      </Link>
      <div className={styles.accountContainer}>
        <h2>Mon compte</h2>
        <ul>
          <li>
            {userInfo.nom} {userInfo.prenom}
          </li>
          <li>{userInfo.email}</li>
        </ul>
        <button className="linkButton" onClick={() => disconnet()}>
          me deconnecter
        </button>
        <h3>Mes handicaps</h3>
        <ul>
          {userHandicaps.map((value) => {
            return (
              <li key={value.id_user_handicap}>
                {value.nom} | type : {value.type}{" "}
                <button
                  className="deleteButton"
                  onClick={() => handleDeleteHandicaps(value.id_handicap)}
                >
                  Supprimer
                </button>
              </li>
            );
          })}
        </ul>
        <label htmlFor="addHandicap">Rajouter un handicape</label>
        <select onChange={handleChangeSelectAddHandicaps} id="addHandicap">
          <option value="" selected disabled hidden>
            Choisisez ici
          </option>
          {allHandicaps.map((handicap) => {
            if (
              !userHandicaps.some(
                (el) => el.id_handicap === handicap.id_handicap
              )
            ) {
              return (
                <option value={handicap.id_handicap} key={handicap.id_handicap}>
                  {handicap.nom} (type : {handicap.type})
                </option>
              );
            } else {
              return "";
            }
          })}
        </select>
        <button className="addButton" onClick={() => handleAddHandicaps()}>
          Ajouter
        </button>

        <Link to="/account/avis" className="linkButton">
          Voir mes avis
        </Link>
        {showEtablissementBtn()}
      </div>
    </div>
  );
};

export default Account;
