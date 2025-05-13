import { pool } from '../config/db.config.js'

const handicapModel = {
    create: async ({ nom, type }) => {
        const result = await pool.query(
            `INSERT INTO Handicap (nom, type) VALUES ($1, $2) RETURNING *`,
            [nom, type]
        )
        return result.rows[0]
    },

    findById: async (id) => {
        const result = await pool.query('SELECT * FROM Handicap WHERE id_handicap = $1', [id])
        return result.rows[0]
    },

    findAll: async () => {
        const result = await pool.query('SELECT * FROM Handicap')
        return result.rows
    },

    update: async (id, data) => {
        const { nom, type } = data
        const result = await pool.query(
            `UPDATE Handicap SET nom = $1, type = $2 WHERE id_handicap = $3 RETURNING *`,
            [nom, type, id]
        )
        return result.rows[0]
    },

    delete: async (id) => {
        await pool.query('DELETE FROM Handicap WHERE id_handicap = $1', [id])
    }
}

export{
    handicapModel
}