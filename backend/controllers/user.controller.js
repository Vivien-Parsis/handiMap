import { userModel } from "../models/user.model.js"

const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id_user)
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" })
        }
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" })
    }
}

const addHandicapToUser = async (req, res) => {
    const id_handicap = req.body.id_handicap

    if (!id_handicap) {
        return res.status(400).json({ message: "id_handicap requis" })
    }

    try {
        const result = await userModel.addHandicap({id_user:req.user.id, id_handicap:id_handicap})
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" })
    }
}

const deleteHandicapFromUser = async (req, res) => {
    const id_handicap = req.body.id_handicap

    if (!id_handicap) {
        return res.status(400).json({ message: "id_handicap requis" })
    }

    try {
        const result = await userModel.deleteHandicap({id_user:req.user.id, id_handicap:id_handicap})
        if (!result) {
            return res.status(404).json({ message: "Association non trouvée" })
        }
        res.json({ message: "Handicap supprimé", data: result })
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" })
    }
}

export {
    getCurrentUser,
    addHandicapToUser,
    deleteHandicapFromUser,
}