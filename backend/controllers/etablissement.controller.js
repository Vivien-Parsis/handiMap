import { etablissementModel } from "../models/etablissement.model.js"


const getAlletablissements = async (req, res) => {
    try {
        const etablissements = await etablissementModel.findAll()
        res.json(etablissements)
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error:err })
    }
}

export {
  getAlletablissements
}