import { pool } from '../config/db.config.js'

const etablissementModel = {
    create: async ({ nom, adresse, type, photo, coordonnees }) => {
        const result = await pool.query(
            `INSERT INTO Etablissement (nom, adresse, type, photo, coordonnees)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [nom, adresse, type, photo, coordonnees]
        )
        return result.rows[0]
    },

    findById: async (id) => {
        const result = await pool.query('SELECT * FROM Etablissement WHERE id_etablissement = $1', [id])
        return result.rows[0]
    },

    findAll: async () => {
        const result = await pool.query('SELECT * FROM Etablissement')
        return result.rows
    },

    update: async (id, data) => {
        const { nom, adresse, type, photo, coordonnees } = data
        const result = await pool.query(
            `UPDATE Etablissement SET nom = $1, adresse = $2, type = $3, photo = $4, coordonnees = $5
       WHERE id_etablissement = $6 RETURNING *`,
            [nom, adresse, type, photo, coordonnees, id]
        )
        return result.rows[0]
    },

    delete: async (id) => {
        await pool.query('DELETE FROM Etablissement WHERE id_etablissement = $1', [id])
    }
}

export{
    etablissementModel
}