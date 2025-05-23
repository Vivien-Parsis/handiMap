import { handicapModel } from "../models/index.js"

const getAllHandicaps = async (req, res) => {
    try {
        const handicaps = await handicapModel.findAll()
        res.json(handicaps)
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

export {
    getAllHandicaps
}