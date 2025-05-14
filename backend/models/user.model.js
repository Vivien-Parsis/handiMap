import { pool } from '../config/db.config.js'

const userModel = {
	create: async ({ email, passwordHash, role = 'user', nom, prenom }) => {
		const result = await pool.query(
			'INSERT INTO users (email, password, role, nom, prenom) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[email, passwordHash, role, nom, prenom]
		)
		return result.rows[0]
	},
	findByEmail: async (email) => {
		const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
		return result.rows[0]
	},
	findById: async (id) => {
		const result = await pool.query('SELECT * FROM users WHERE id_user = $1', [id])
		return result.rows[0]
	},
	findUserHandicap: async (id) => {
		const result = await pool.query('SELECT * FROM Handicap JOIN User_Handicap ON Handicap.id_handicap = User_Handicap.id_handicap WHERE User_Handicap.id_user = $1', [id])
        return result.rows
	},
	findUserAvis: async (id) => {
		const result = await pool.query('SELECT * FROM Avis JOIN Etablissement ON Avis.id_etablissement = Etablissement.id_etablissement WHERE id_user = $1 ORDER BY Avis.date DESC', [id])
        return result.rows
	},
	addHandicap: async ({ id_user, id_handicap }) => {
		const result = await pool.query(
			'INSERT INTO User_Handicap (id_user, id_handicap) VALUES ($1, $2) RETURNING *',
			[id_user, id_handicap]
		)
		return result.rows[0]
	},
	deleteHandicap: async ({ id_user, id_handicap }) => {
		const result = await pool.query(
			'DELETE FROM User_Handicap WHERE id_user = $1 AND id_handicap = $2 RETURNING *',
			[id_user, id_handicap]
		)
		return result.rows[0]
	},
	deleteAvis: async ({ id_user, id_avis }) => {
		const result = await pool.query(
			'DELETE FROM Avis WHERE id_user = $1 AND id_avis = $2 RETURNING *',
			[id_user, id_avis]
		)
		return result.rows[0]
	}
}

export{
	userModel
}