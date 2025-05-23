import { pool } from "../config/db.config.js"

const etablissementModel = {
    create: async ({ nom, adresse, type, photo, coordonnees, id_user }) => {
        const result = await pool.query(id_user ?
            'INSERT INTO etablissement (nom, adresse, type, photo, coordonnees, id_user) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *' :
            'INSERT INTO etablissement (nom, adresse, type, photo, coordonnees) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            id_user ?
                [nom, adresse, type, photo, coordonnees, id_user] :
                [nom, adresse, type, photo, coordonnees]
        )
        return result.rows[0]
    },

    findById: async (id) => {
        const result = await pool.query('SELECT * FROM etablissement WHERE id_etablissement = $1', [id])
        return result.rows[0]
    },

    findAll: async () => {
        const result = await pool.query('SELECT * FROM etablissement')
        return result.rows
    },

    findWithAllJoin: async (id) => {
        const result = await pool.query("SELECT Etablissement.id_etablissement, Etablissement.nom AS nom_etablissement, Etablissement.adresse, Etablissement.type AS type_etablissement, Etablissement.photo AS photo_etablissement, Etablissement.coordonnees, Handicap.id_handicap, Handicap.nom AS nom_handicap, Handicap.type AS type_handicap, Avis.id_avis, Avis.note, Avis.date, Avis.commentaire, Avis.photo AS photo_avis, Avis.id_user AS auteur_avis, users.nom AS nom_auteur_avis, users.prenom AS prenom_auteur_avis FROM Etablissement LEFT JOIN Accessibilite ON Etablissement.id_etablissement = Accessibilite.id_etablissement LEFT JOIN Handicap ON Accessibilite.id_handicap = Handicap.id_handicap LEFT JOIN Avis ON Etablissement.id_etablissement = Avis.id_etablissement LEFT JOIN users ON Avis.id_user = users.id_user WHERE Etablissement.id_etablissement = $1;", [id])
        return result.rows
    },
    update: async (id, data, id_user) => {
        const { nom, adresse, type, photo, coordonnees } = data
        const result = await pool.query(
            `UPDATE etablissement SET nom = $1, adresse = $2, type = $3, photo = $4, coordonnees = $5
       WHERE id_etablissement = $6 AND id_user = $7 RETURNING *`,
            [nom, adresse, type, photo, coordonnees, id, id_user]
        )
        return result.rows[0]
    },
    deleteIfOwner: async (id_etablissement, id_user) => {
        const result = await pool.query(
            'DELETE FROM etablissement WHERE id_etablissement = $1 AND id_user = $2 RETURNING *',
            [id_etablissement, id_user]
        )
        return result.rows[0]
    },
    delete: async (id) => {
        const result = await pool.query('DELETE FROM Etablissement WHERE id_etablissement = $1 RETURNING *', [id])
        return result.rows[0]
    },
    findAllOwnerEtablissement: async (id) => {
        const result = await pool.query("SELECT Etablissement.id_etablissement, Etablissement.nom AS nom_etablissement, Etablissement.adresse, Etablissement.type AS type_etablissement, Etablissement.photo AS photo_etablissement, Etablissement.coordonnees, Handicap.id_handicap, Handicap.nom AS nom_handicap, Handicap.type AS type_handicap, Avis.id_avis, Avis.note, Avis.date, Avis.commentaire, Avis.photo AS photo_avis, Avis.id_user AS auteur_avis, users.nom AS nom_auteur_avis, users.prenom AS prenom_auteur_avis FROM Etablissement LEFT JOIN Accessibilite ON Etablissement.id_etablissement = Accessibilite.id_etablissement LEFT JOIN Handicap ON Accessibilite.id_handicap = Handicap.id_handicap LEFT JOIN Avis ON Etablissement.id_etablissement = Avis.id_etablissement LEFT JOIN users ON Avis.id_user = users.id_user WHERE Etablissement.id_user = $1;", [id])
        return result.rows
    },
    addHandicaps: async (id_etablissement, id_handicap, id_user) => {
        const result = await pool.query('INSERT INTO accessibilite (id_etablissement, id_handicap) SELECT $1, $2 WHERE EXISTS ( SELECT 1 FROM etablissement WHERE id_etablissement = $1 AND id_user = $3) RETURNING *', [id_etablissement, id_handicap, id_user])
        return result.rows
    },
    deleteHandicaps: async (id_etablissement, id_handicap, id_user) => {
        const result = await pool.query('DELETE FROM accessibilite WHERE id_etablissement = $1 AND id_handicap = $2 AND EXISTS ( SELECT 1 FROM etablissement WHERE id_etablissement = $1 AND id_user = $3 ) RETURNING *', [id_etablissement, id_handicap, id_user])
        return result.rows
    }
}

export {
    etablissementModel
} 