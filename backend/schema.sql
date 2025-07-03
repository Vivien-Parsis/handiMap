CREATE TYPE role_type AS ENUM ('user', 'owner', 'admin');

CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    mail VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role role_type DEFAULT 'user'
);
CREATE TABLE handicap (
    id_handicap SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    type VARCHAR(20)
);
CREATE TABLE etablissement (
    id_etablissement SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    adresse VARCHAR(200),
    type VARCHAR(20),
    photo VARCHAR(150),
    coordonnees VARCHAR(50),
    id_user INTEGER,
    CONSTRAINT fk_etab_user FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE SET NULL
);
CREATE TABLE avis (
    id_avis SERIAL PRIMARY KEY,
    note INTEGER CHECK (note >= 0 AND note <= 5),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    commentaire VARCHAR(500),
    photo VARCHAR(150),
    id_user INTEGER NOT NULL,
    id_etablissement INTEGER NOT NULL,
    CONSTRAINT fk_avis_user FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    CONSTRAINT fk_avis_etab FOREIGN KEY (id_etablissement) REFERENCES etablissement(id_etablissement) ON DELETE CASCADE
);
CREATE TABLE accessibilite (
    id_etablissement INTEGER NOT NULL,
    id_handicap INTEGER NOT NULL,
    CONSTRAINT pk_accessibilite PRIMARY KEY (id_etablissement, id_handicap),
    CONSTRAINT fk_access_etab FOREIGN KEY (id_etablissement) REFERENCES etablissement(id_etablissement) ON DELETE CASCADE,
    CONSTRAINT fk_access_handicap FOREIGN KEY (id_handicap) REFERENCES handicap(id_handicap) ON DELETE CASCADE
);

CREATE TABLE user_handicap (
    id_user INTEGER NOT NULL,
    id_handicap INTEGER NOT NULL,
    CONSTRAINT pk_user_handicap PRIMARY KEY (id_user, id_handicap),
    CONSTRAINT fk_user_handicap_user FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    CONSTRAINT fk_user_handicap_handicap FOREIGN KEY (id_handicap) REFERENCES handicap(id_handicap) ON DELETE CASCADE
);
