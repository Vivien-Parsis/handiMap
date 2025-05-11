const { etablissementModel } = require("../models/etablissement.model")


const getAlletablissements = async (req, res) => {
    try {
        const etablissements = await etablissementModel.findAll()
        res.json(etablissements)
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" })
    }
}

module.exports = {
  getAlletablissements
}