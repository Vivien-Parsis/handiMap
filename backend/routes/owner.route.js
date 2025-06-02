import {
    addHandicapToEtablissement,
    createEtablissement,
    deleteHandicapToEtablissement,
    getAllOwnerEtablissement,
    updateEtablissement,
    deleteEtablissement,
    getAllAvisFromEtablissement,
    deleteAvisFromEtablissement
} from "../controllers/owner.controller.js" 
import { Router } from "express"
import { upload } from "../middlewares/upload.middleware.js"
import { checkOwnerRouteJwt } from "../middlewares/auth.middleware.js"

const ownerRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Owner
 *   description: Opérations réservées aux propriétaires
 */

/**
 * @swagger
 * /api/v1/etablissements:
 *   get:
 *     summary: Récupérer tous les établissements du propriétaire
 *     tags: [Owner]
 *     security:
 *       - jwtToken: []
 *     responses:
 *       200:
 *         description: Liste des établissements récupérée avec succès
 *       401:
 *         description: Non autorisé
 *   post:
 *     summary: Créer un nouvel établissement
 *     tags: [Owner]
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nom_etablissement
 *               - adresse
 *               - type_etablissement
 *               - coordonnees
 *             properties:
 *               nom_etablissement:
 *                 type: string
 *               adresse:
 *                 type: string
 *               type_etablissement:
 *                 type: string
 *               coordonnees:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Établissement créé
 *       400:
 *         description: Données invalides
 *   put:
 *     summary: Modifier un établissement existant
 *     tags: [Owner]
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - id_etablissement
 *             properties:
 *               id_etablissement:
 *                 type: integer
 *               nom_etablissement:
 *                 type: string
 *               adresse:
 *                 type: string
 *               type_etablissement:
 *                 type: string
 *               coordonnees:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Établissement mis à jour
 *   delete:
 *     summary: Supprimer un établissement
 *     tags: [Owner]
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_etablissement
 *             properties:
 *               id_etablissement:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Établissement supprimé
 */

/**
 * @swagger
 * /api/v1/etablissements/handicaps:
 *   post:
 *     summary: Ajouter un handicap à un établissement
 *     tags: [Owner]
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_etablissement
 *               - id_handicap
 *             properties:
 *               id_etablissement:
 *                 type: integer
 *               id_handicap:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Handicap ajouté
 *   delete:
 *     summary: Supprimer un handicap d’un établissement
 *     tags: [Owner]
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_etablissement
 *               - id_handicap
 *             properties:
 *               id_etablissement:
 *                 type: integer
 *               id_handicap:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Handicap supprimé
 */

/**
 * @swagger
 * /api/v1/etablissements/avis:
 *   get:
 *     summary: Récupérer tous les avis d’un établissement
 *     tags: [Owner]
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: query
 *         name: id_etablissement
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'établissement
 *     responses:
 *       200:
 *         description: Liste des avis
 *   delete:
 *     summary: Supprimer un avis d’un établissement
 *     tags: [Owner]
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_avis
 *             properties:
 *               id_avis:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Avis supprimé
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     jwtToken:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: JWT brut sans le préfixe "Bearer"
 */
ownerRouter.get("/etablissements", checkOwnerRouteJwt, getAllOwnerEtablissement)
ownerRouter.post("/etablissements", checkOwnerRouteJwt, upload.single('photo'), createEtablissement)
ownerRouter.put("/etablissements", checkOwnerRouteJwt, upload.single('photo'), updateEtablissement)
ownerRouter.delete("/etablissements", checkOwnerRouteJwt, deleteEtablissement)

ownerRouter.post("/etablissements/handicaps", checkOwnerRouteJwt, addHandicapToEtablissement)
ownerRouter.delete("/etablissements/handicaps", checkOwnerRouteJwt, deleteHandicapToEtablissement)

ownerRouter.get("/etablissements/avis", checkOwnerRouteJwt, getAllAvisFromEtablissement)
ownerRouter.delete("/etablissements/avis", checkOwnerRouteJwt, deleteAvisFromEtablissement)

export {
    ownerRouter
}