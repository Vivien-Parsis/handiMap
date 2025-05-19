import vine from '@vinejs/vine'
import { userModel } from "../models/user.model.js"

const getCurrentUser = async (req, res) => {
    const schema = vine.object({
        id_user: vine.number().withoutDecimals()
    })
    try {
        const validator = vine.compile(schema)
        await validator.validate({ id_user: req.user.id_user })
        const user = await userModel.findById(req.user.id_user)
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" })
        } else {
            return res.json(user)
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

const addHandicapToUser = async (req, res) => {
    const schema = vine.object({
        id_handicap: vine.number().withoutDecimals(),
        id_user: vine.number().withoutDecimals(),
    })
    const id_handicap = req.body.id_handicap
    try {
        const validator = vine.compile(schema)
        await validator.validate({ id_user: req.user.id_user, id_handicap: id_handicap })
        const result = await userModel.addHandicap({ id_user: req.user.id_user, id_handicap: id_handicap })
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

const deleteHandicapFromUser = async (req, res) => {
    const schema = vine.object({
        id_handicap: vine.number().withoutDecimals(),
        id_user: vine.number().withoutDecimals(),
    })
    const id_handicap = req.body.id_handicap

    if (!id_handicap) {
        return res.status(400).json({ message: "id_handicap requis" })
    }

    try {
        const validator = vine.compile(schema)
        await validator.validate({ id_user: req.user.id_user, id_handicap: id_handicap })
        const result = await userModel.deleteHandicap({ id_user: req.user.id_user, id_handicap: id_handicap })
        if (!result) {
            return res.status(404).json({ message: "Association non trouvée" })
        } else {
            return res.json({ message: "Handicap supprimé", data: result })
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

const getUserHandicap = async (req, res) => {
    const schema = vine.object({
        id_user: vine.number().withoutDecimals()
    })
    try {
        const validator = vine.compile(schema)
        await validator.validate({ id_user: req.user.id_user })
        const handicaps = await userModel.findUserHandicap(req.user.id_user)
        if (!handicaps) {
            return res.status(404).json({ message: "Handicap introuvable" })
        } else {
            return res.json(handicaps)
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

const getUserAvis = async (req, res) => {
    try {
        const avis = await userModel.findUserAvis(req.user.id_user)
        if (!avis) {
            return res.status(404).json({ message: "Handicap introuvable" })
        } else {
            res.json(avis)
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

const deleteAvisFromUser = async (req, res) => {
    const schema = vine.object({
        id_avis: vine.number().withoutDecimals(),
        id_user: vine.number().withoutDecimals(),
    })
    const id_avis = req.body.id_avis
    try {
        const validator = vine.compile(schema)
        await validator.validate({ id_user: req.user.id_user, id_avis: id_avis })
        const result = await userModel.deleteHandicap({ id_user: req.user.id_user, id_avis: id_avis })
        if (!result) {
            return res.status(404).json({ message: "Association non trouvée" })
        }
        res.json({ message: "avis supprimé", data: result })
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

export {
    getCurrentUser,
    addHandicapToUser,
    deleteHandicapFromUser,
    getUserHandicap,
    getUserAvis,
    deleteAvisFromUser
}