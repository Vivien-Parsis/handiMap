import { etablissementModel } from "../models/etablissement.model.js"
import vine from '@vinejs/vine'

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
                    auteur_avis: etab.auteur_avis
                })
            }
        }

        res.json(transformRes)
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
        
        
        console.log({ id_user: req.user.id_user, id_handicap: req.body.id_handicap, id_etablissement: req.body.id_etablissement})
        await validator.validate({ id_user: req.user.id_user, id_handicap: req.body.id_handicap, id_etablissement: req.body.id_etablissement})
        const etablissement = await etablissementModel.addHandicaps(req.body.id_etablissement, req.body.id_handicap, req.user.id_user)
        if(etablissement.length==0){
            return res.status(403).json({ message: "cet etablissement ne vous apartient pas"})
        }else{
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
        if(etablissement.length==0){
            return res.status(403).json({ message: "cet etablissement ne vous apartient pas"})
        }else{
            res.json(etablissement)
        }
        res.json(etablissement)
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}
export {
    getAllOwnerEtablissement,
    addHandicapToEtablissement,
    deleteHandicapToEtablissement
}