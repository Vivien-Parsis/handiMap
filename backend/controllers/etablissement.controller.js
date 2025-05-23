import vine from "@vinejs/vine"
import { etablissementModel } from "../models/index.js"

const getAllEtablissements = async (req, res) => {
    try {
        const etablissements = await etablissementModel.findAll()
        res.json(etablissements)
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}
const getEtablissementWithAllJoin = async (req, res) => {
    const schema = vine.object({
        id_etablissement: vine.number().withoutDecimals()
    })
    try {
        const validator = vine.compile(schema)
        await validator.validate({ id_etablissement: req.query.id_etablissement })
        const etablissement = await etablissementModel.findWithAllJoin(req.query.id_etablissement)
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
        res.json(transformRes[0])
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err })
    }
}

export {
    getAllEtablissements,
    getEtablissementWithAllJoin
}