import vine from "@vinejs/vine"
import { handicapModel, avisModel, userModel } from "../models/index.js"

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
        const result = await userModel.addHandicap({ id_user: Number(req.user.id_user), id_handicap: Number(id_handicap) })
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
        const result = await userModel.deleteHandicap({ id_user: Number(req.user.id_user), id_handicap: Number(id_handicap) })
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
        const handicaps = await handicapModel.findUserHandicap(Number(req.user.id_user))
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
        const avis = await avisModel.findUserAvis(Number(req.user.id_user))
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
        const result = await userModel.deleteAvis({ id_user: Number(req.user.id_user), id_avis: Number(id_avis) })
        if (!result) {
            return res.status(404).json({ message: "Association non trouvée" })
        }
        res.json({ message: "avis supprimé", data: result })
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

const createUserAvis = async (req, res) => {
    const schema = vine.object({
        note: vine.number().withoutDecimals(),
        id_user: vine.number().withoutDecimals(),
        id_etablissement: vine.number().withoutDecimals(),
        commentaire: vine.string()
    })
    let photo = ""
    if (req.file) {
        photo = req.file.path || ""
    }
    const currentAvis = {
        note: req.body.note,
        id_user: req.user.id_user,
        id_etablissement: req.body.id_etablissement,
        photo: photo,
        commentaire: req.body.commentaire,
        date: new Date()
    }
    try {
        const validator = vine.compile(schema)
        await validator.validate({
            note: currentAvis.note,
            id_user: currentAvis.id_user,
            id_etablissement: currentAvis.id_etablissement,
            commentaire: currentAvis.commentaire,
            photo:photo
        })
        const avis = await avisModel.create(currentAvis)
        res.status(201).json(avis)
    } catch (err) {
        console.error("Validation or DB error:", err)
        res.status(500).json({ message: "Erreur serveur", error: err.message })
    }
}
const deleteUserById = async (req, res) => {
    try {
        const validator = vine.compile(
            vine.object({ id_user: vine.number().withoutDecimals() })
        )
        await validator.validate({ id_user: req.user.id_user })

        const result = await userModel.deleteById(Number(req.user.id_user))

        if (!result) {
            return res.status(404).json({ message: "Utilisateur introuvable" })
        }

        res.json({ message: "Utilisateur supprimé", data: result })
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}
const updateUserNomPrenom = async (req, res) => {
    const newInfo = { nom: req.body.nom, prenom: req.body.prenom }
    console.log(newInfo)
    try {
        const validator = vine.compile(
            vine.object({
                nom: vine.string(),
                prenom: vine.string()
            })
        )
        await validator.validate(newInfo)

        const result = await userModel.updateNomPrenom({
            id_user: Number(req.user.id_user),
            nom: newInfo.nom,
            prenom: newInfo.prenom
        })

        if (!result) {
            return res.status(404).json({ message: "Utilisateur introuvable" })
        }

        res.json({ message: "Informations mises à jour", data: result })
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
    deleteAvisFromUser,
    createUserAvis,
    deleteUserById,
    updateUserNomPrenom
}
