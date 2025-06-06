import React from "react";
import styles from "../assets/css/mentionsLegales.module.css";
import { Link } from "react-router";

const MentionsLegales = () => {
  return (
    <div className="backgroundBlured">
      <Link to="/" className="linkText">
        Revenir sur l'accueil
      </Link>
      <section className={styles.mentionsLegales}>
        <h2>Mentions Légales</h2>

        <h3>Informations générales</h3>
        <p>Nom du site : Handi'Map</p>
        <p>Éditeur : Vivien PARSIS</p>
        <p>Responsable de publication : Vivien PARSIS</p>
        <p>Contact : vivienparsis.perso@gmail.com</p>

        <h3>Hébergement</h3>
        <p>Hébergeur : Render.com</p>
        <p>Adresse : [Adresse de l'hébergeur]</p>
        <p>Téléphone : [Numéro de téléphone de l'hébergeur]</p>

        <h3>Données personnelles</h3>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), les données collectées sont strictement nécessaires au bon
          fonctionnement du site. Aucune donnée n'est cédée ou vendue à des
          tiers.
        </p>
        <p>
          Vous pouvez exercer vos droits d'accès, de rectification ou de
          suppression à tout moment via : vivienparsis.perso@gmail.com .
        </p>

        <h3>Cookies</h3>
        <p>
          Ce site utilise uniquement des cookies techniques nécessaires à son
          bon fonctionnement. Aucun cookie publicitaire ou de suivi n'est
          utilisé.
        </p>

        <h3>Propriété intellectuelle</h3>
        <p>
          Tout le contenu de ce site (textes, images, logos, code, etc.) est la
          propriété de Vivien PARSIS, sauf indication contraire. Toute
          reproduction, totale ou partielle, sans autorisation est interdite.
        </p>

        <h3>Droit applicable</h3>
        <p>
          Les présentes mentions sont régies par le droit français. Tout litige
          sera soumis aux tribunaux compétents du ressort de l'éditeur.
        </p>
      </section>
    </div>
  );
};

export default MentionsLegales;
