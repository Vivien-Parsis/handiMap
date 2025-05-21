import { pool } from '../config/db.config.js'

const avisModel = {
    create: async ({ note, date, commentaire, photo, id_user, id_etablissement }) => {
        const result = await pool.query(
            'INSERT INTO avis (note, date, commentaire, photo, id_user, id_etablissement) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [note, date, commentaire, photo, id_user, id_etablissement]
        )
        return result.rows[0]
    },
    findUserAvis: async (id) => {
        const result = await pool.query('SELECT Avis.id_avis, Avis.note, Avis.date, Avis.commentaire, Avis.photo AS photo_avis, Etablissement.id_etablissement, Etablissement.nom AS nom_etablissement, Etablissement.adresse, Etablissement.type AS type_etablissement, Etablissement.photo AS photo_etablissement, Etablissement.coordonnees FROM Avis JOIN Etablissement ON Avis.id_etablissement = Etablissement.id_etablissement WHERE Avis.id_user = $1 ORDER BY Avis.date DESC; ', [id])
        return result.rows
    },
    findByEtablissement: async (id_etablissement) => {
        const result = await pool.query('SELECT * FROM avis WHERE id_etablissement = $1 RETURNING *', [id_etablissement])
        return result.rows[0]
    },
    update: async (id, data) => {
        const { note, commentaire, photo } = data
        const result = await db.query(
            `UPDATE Avis SET note = $1, commentaire = $2, photo = $3 WHERE id_avis = $4 RETURNING *`,
            [note, commentaire, photo, id]
        )
        return result.rows[0]
    },
    delete: async (id) => {
        await db.query('DELETE FROM Avis WHERE id_avis = $1', [id])
    },
    findAllFromEtablissementIfOwner: async (id_etablissement, id_user) => {
        const result = await pool.query("SELECT Avis.id_avis, Avis.note, Avis.date, Avis.commentaire, Avis.photo AS photo_avis, Users.id_user AS auteur_avis, Users.nom AS nom_auteur_avis, Users.prenom AS prenom_auteur_avis, Etablissement.id_etablissement, Etablissement.nom AS nom_etablissement FROM Avis JOIN Etablissement ON Avis.id_etablissement = Etablissement.id_etablissement JOIN Users ON Avis.id_user = Users.id_user WHERE Etablissement.id_etablissement = $1 AND Etablissement.id_user = $2 ORDER BY Avis.date DESC", [id_etablissement, id_user]);
        return result.rows
    },
    deleteIfOwner: async (id_avis, id_etablissement, id_user) => {
        const result = await pool.query(
            "DELETE FROM Avis USING Etablissement WHERE Avis.id_avis = $1 AND Avis.id_etablissement = Etablissement.id_etablissement AND Etablissement.id_etablissement = $2 AND Etablissement.id_user = $3 RETURNING *",[id_avis, id_etablissement, id_user])
        return result.rows[0]
    }
}

export {
    avisModel
}