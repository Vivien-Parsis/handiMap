import { getAllEtablissements, getAllEtablissementWithAllJoin, getEtablissementWithAllJoin } from "../controllers/etablissement.controller.js"

import { Router } from "express"
const etablissementRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Etablissement
 *   description: Opérations publiques sur les établissements
 */

/**
 * @swagger
 * /etablissements:
 *   get:
 *     summary: Récupérer tous les établissements (sans jointures)
 *     tags: [Etablissement]
 *     responses:
 *       200:
 *         description: Liste des établissements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_etablissement:
 *                     type: integer
 *                   nom_etablissement:
 *                     type: string
 *                   adresse:
 *                     type: string
 *                   type_etablissement:
 *                     type: string
 *                   photo_etablissement:
 *                     type: string
 *                   coordonnees:
 *                     type: string
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /etablissements/with-relations:
 *   get:
 *     summary: Récupérer un établissement avec ses handicaps et avis
 *     tags: [Etablissement]
 *     parameters:
 *       - in: query
 *         name: id_etablissement
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'établissement à récupérer
 *     responses:
 *       200:
 *         description: Établissement enrichi récupéré
 *       400:
 *         description: Requête invalide (ID manquant ou incorrect)
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /etablissements/all-with-relations:
 *   get:
 *     summary: Récupérer tous les établissements avec leurs handicaps et avis
 *     tags: [Etablissement]
 *     responses:
 *       200:
 *         description: Liste enrichie des établissements
 *       500:
 *         description: Erreur serveur
 */

etablissementRouter.get("/", getAllEtablissements)
etablissementRouter.get("/with-relations", getEtablissementWithAllJoin)
etablissementRouter.get("/all-with-relations", getAllEtablissementWithAllJoin)

export {
    etablissementRouter
}