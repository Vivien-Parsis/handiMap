const { pool } = require('../config/db.config')

const etablissementModel = {
    create: async ({ nom, adresse, type, photo, coordonnees }) => {
        const result = await db.query(
            `INSERT INTO Etablissement (nom, adresse, type, photo, coordonnees)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [nom, adresse, type, photo, coordonnees]
        )
        return result.rows[0]
    },

    findById: async (id) => {
        const result = await db.query('SELECT * FROM Etablissement WHERE id_etablissement = $1', [id])
        return result.rows[0]
    },

    findAll: async () => {
        const result = await db.query('SELECT * FROM Etablissement')
        return result.rows
    },

    update: async (id, data) => {
        const { nom, adresse, type, photo, coordonnees } = data
        const result = await db.query(
            `UPDATE Etablissement SET nom = $1, adresse = $2, type = $3, photo = $4, coordonnees = $5
       WHERE id_etablissement = $6 RETURNING *`,
            [nom, adresse, type, photo, coordonnees, id]
        )
        return result.rows[0]
    },

    delete: async (id) => {
        await db.query('DELETE FROM Etablissement WHERE id_etablissement = $1', [id])
    }
}

module.exports = {
    etablissementModel
}