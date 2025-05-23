import { avisModel, etablissementModel } from "../models/index.js"
import vine from "@vinejs/vine"
import { pool } from "../config/db.config.js"

const getAllOwnerEtablissement = async (req, res) => {
    const schema = vine.object({
        id_user: vine.number().withoutDecimals()
    })
    try {
        const validator = vine.compile(schema)
        await validator.validate({ id_user: req.user.id_user })
        const etablissement = await etablissementModel.findAllOwnerEtablissement(req.user.id_user)
        const transformRes = []

        for (let etab of etablissement) {
            if (!transformRes.some(e => e.id_etablissement == etab.id_etablissement)) {
                transformRes.push({
                    id_etablissement: etab.id_etablissement,
                    nom_etablissement: etab.nom_etablissement,
                    adresse: etab.adresse,
                    type_etablissement: etab.type_etablissement,
                    photo_etablissement: etab.photo_etablissement,
                    coordonnees: etab.coordonnees,
                    handicaps: [],
                    avis: []
                })
            }

            const currentEtab = transformRes.find(e => e.id_etablissement == etab.id_etablissement)

            if (etab.id_handicap && !currentEtab.handicaps.some(h => h.id_handicap === etab.id_handicap)) {
                currentEtab.handicaps.push({
                    id_handicap: etab.id_handicap,
                    nom_handicap: etab.nom_handicap,
                    type_handicap: etab.type_handicap
                })
            }

            if (etab.id_avis && !currentEtab.avis.some(a => a.id_avis === etab.id_avis)) {
                currentEtab.avis.push({
                    id_avis: etab.id_avis,
                    note: etab.note,
                    date: etab.date,
                    commentaire: etab.commentaire,
                    photo_avis: etab.photo_avis,
                    auteur_avis: etab.auteur_avis,
                    nom_auteur_avis: etab.nom_auteur_avis,
                    prenom_auteur_avis: etab.prenom_auteur_avis
                })
            }
        }

        res.json(transformRes)
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

const createEtablissement = async (req, res) => {
    const schema = vine.object({
        nom: vine.string(),
        adresse: vine.string(),
        type: vine.string(),
        coordonnees: vine.string(),
        id_user: vine.number().withoutDecimals()
    })
    let photo = ""
    if (req.file) {
        photo = req.file.path || ""
    }
    const currentEtablissement = {
        nom: req.body.nom,
        adresse: req.body.adresse,
        type: req.body.type,
        photo: photo,
        coordonnees: req.body.coordonnees,
        id_user: req.user.id_user
    }
    try {
        const validator = vine.compile(schema)
        await validator.validate(currentEtablissement)

        const etablissement = await etablissementModel.create(currentEtablissement)
        res.status(201).json(etablissement)
    } catch (err) {
        console.error("Validation or DB error:", err)
        res.status(500).json({ message: "Erreur serveur", error: err.message })
    }
}

const updateEtablissement = async (req, res) => {
    const schema = vine.object({
        id_etablissement: vine.number().withoutDecimals(),
        nom: vine.string(),
        adresse: vine.string(),
        type: vine.string(),
        photo: vine.string(),
        coordonnees: vine.string(),
        id_user: vine.number().withoutDecimals()
    })
    let photo = ""
    if (req.file) {
        photo = req.file.path || ""
    }
    const currentEtablissement = {
        id_etablissement: req.body.id_etablissement,
        nom: req.body.nom,
        adresse: req.body.adresse,
        type: req.body.type,
        photo: photo,
        coordonnees: req.body.coordonnees,
        id_user: req.user.id_user
    }
    try {
        const validator = vine.compile(schema)
        await validator.validate(currentEtablissement)

        const check = await pool.query(
            'SELECT * FROM etablissement WHERE id_etablissement = $1 AND id_user = $2',
            [currentEtablissement.id_etablissement, currentEtablissement.id_user]
        )

        if (check.rows.length == 0) {
            return res.status(403).json({ message: "cet etablissement ne vous appartient pas" })
        }

        const updated = await etablissementModel.update(currentEtablissement.id_etablissement, {
            nom: currentEtablissement.nom,
            adresse: currentEtablissement.adresse,
            type: currentEtablissement.type,
            photo: currentEtablissement.photo,
            coordonnees: currentEtablissement.coordonnees
        }, req.user.id_user)

        res.status(200).json(updated)
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

const deleteEtablissement = async (req, res) => {
    const schema = vine.object({
        id_etablissement: vine.number().withoutDecimals(),
        id_user: vine.number().withoutDecimals()
    })
    try {
        const validator = vine.compile(schema)
        await validator.validate({
            id_etablissement: req.body.id_etablissement,
            id_user: req.user.id_user
        })

        const deleted = await etablissementModel.deleteIfOwner(req.body.id_etablissement, req.user.id_user)

        if (!deleted) {
            return res.status(403).json({ message: "cet etablissement ne vous appartient pas" })
        }

        res.json(deleted)
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

const addHandicapToEtablissement = async (req, res) => {
    const schema = vine.object({
        id_user: vine.number().withoutDecimals(),
        id_handicap: vine.number().withoutDecimals(),
        id_etablissement: vine.number().withoutDecimals()
    })
    try {
        const validator = vine.compile(schema)

        await validator.validate({ id_user: req.user.id_user, id_handicap: req.body.id_handicap, id_etablissement: req.body.id_etablissement })
        const etablissement = await etablissementModel.addHandicaps(req.body.id_etablissement, req.body.id_handicap, req.user.id_user)
        if (etablissement.length == 0) {
            return res.status(403).json({ message: "cet etablissement ne vous apartient pas" })
        } else {
            res.json(etablissement)
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

const deleteHandicapToEtablissement = async (req, res) => {
    const schema = vine.object({
        id_user: vine.number().withoutDecimals(),
        id_handicap: vine.number().withoutDecimals(),
        id_etablissement: vine.number().withoutDecimals()
    })
    try {
        const validator = vine.compile(schema)
        await validator.validate({ id_user: req.user.id_user, id_handicap: req.body.id_handicap, id_etablissement: req.body.id_etablissement })
        const etablissement = await etablissementModel.deleteHandicaps(req.body.id_etablissement, req.body.id_handicap, req.user.id_user)
        if (etablissement.length == 0) {
            return res.status(403).json({ message: "cet etablissement ne vous apartient pas" })
        } else {
            res.json(etablissement)
        }
        res.json(etablissement)
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

const getAllAvisFromEtablissement = async (req, res) => {
    const schema = vine.object({
        id_user: vine.number().withoutDecimals(),
        id_etablissement: vine.number().withoutDecimals()
    })
    try {
        const validator = vine.compile(schema)
        await validator.validate({
            id_user: req.user.id_user,
            id_etablissement: Number(req.query.id_etablissement)
        })

        const avis = await avisModel.findAllFromEtablissementIfOwner(Number(req.query.id_etablissement), req.user.id_user)

        if (!avis.length) {
            return res.status(403).json({ message: "Cet établissement ne vous appartient pas ou aucun avis trouvé." })
        }

        res.json(avis)
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

const deleteAvisFromEtablissement = async (req, res) => {
    const schema = vine.object({
        id_user: vine.number().withoutDecimals(),
        id_etablissement: vine.number().withoutDecimals(),
        id_avis: vine.number().withoutDecimals()
    })

    try {
        const validator = vine.compile(schema)
        await validator.validate({
            id_user: req.user.id_user,
            id_etablissement: req.body.id_etablissement,
            id_avis: req.body.id_avis
        })

        const deleted = await avisModel.deleteIfOwner(
            req.body.id_avis,
            req.body.id_etablissement,
            req.user.id_user
        )

        if (!deleted) {
            return res.status(403).json({ message: "Cet avis n'existe pas ou ne vous appartient pas." })
        }

        res.json(deleted)
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}
export {
    getAllOwnerEtablissement,
    addHandicapToEtablissement,
    deleteHandicapToEtablissement,
    createEtablissement,
    updateEtablissement,
    deleteEtablissement,
    getAllAvisFromEtablissement,
    deleteAvisFromEtablissement
}