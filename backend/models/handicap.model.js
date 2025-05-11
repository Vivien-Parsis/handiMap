const { pool } = require('../config/db.config')

const handicapModel = {
    create: async ({ nom, type }) => {
        const result = await db.query(
            `INSERT INTO Handicap (nom, type) VALUES ($1, $2) RETURNING *`,
            [nom, type]
        )
        return result.rows[0]
    },

    findById: async (id) => {
        const result = await db.query('SELECT * FROM Handicap WHERE id_handicap = $1', [id])
        return result.rows[0]
    },

    findAll: async () => {
        const result = await db.query('SELECT * FROM Handicap')
        return result.rows
    },

    update: async (id, data) => {
        const { nom, type } = data
        const result = await db.query(
            `UPDATE Handicap SET nom = $1, type = $2 WHERE id_handicap = $3 RETURNING *`,
            [nom, type, id]
        )
        return result.rows[0]
    },

    delete: async (id) => {
        await db.query('DELETE FROM Handicap WHERE id_handicap = $1', [id])
    }
}

module.exports = {
    handicapModel
}