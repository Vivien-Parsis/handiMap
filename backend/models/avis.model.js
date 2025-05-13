import { pool } from '../config/db.config.js'

const avisModel = {
    create: async ({ note, date, commentaire, photo, id_user, id_etablissement }) => {
        const result = await pool.query(
            'INSERT INTO avis (note, date, commentaire, photo, id_user, id_etablissement) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [note, date, commentaire, photo, id_user, id_etablissement]
        )
        return result.rows[0]
    },
    findByUser: async (id_user) => {
        const result = await pool.query('SELECT * FROM avis WHERE id_user = $1', [id_user])
        return result.rows[0]
    },
    findByEtablissement: async (id_etablissement) => {
        const result = await pool.query('SELECT * FROM avis WHERE id_etablissement = $1', [id_etablissement])
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
        await db.query('DELETE FROM Avis WHERE id_avis = $1', [id]);
    }
}

export {
    avisModel
}