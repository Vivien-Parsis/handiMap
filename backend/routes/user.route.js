import {
    getCurrentUser,
    addHandicapToUser,
    deleteHandicapFromUser,
    getUserHandicap,
    getUserAvis,
    deleteAvisFromUser,
    createUserAvis,
    updateUserNomPrenom,
    deleteUserById
} from "../controllers/user.controller.js"

import { Router } from "express"
import { checkRouteJwt } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/upload.middleware.js"
const userRouter = Router()

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Opérations liées à l'utilisateur connecté
 */

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     tags: [User]
 *     security:
 *       - jwtToken: []
 *     responses:
 *       200:
 *         description: Données utilisateur récupérées
 *       401:
 *         description: Non autorisé
 *   put:
 *     summary: Modifier le nom et prénom de l'utilisateur
 *     tags: [User]
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nom et prénom mis à jour
 *       403:
 *         description: Accès refusé
 *   delete:
 *     summary: Supprimer définitivement l'utilisateur connecté
 *     tags: [User]
 *     security:
 *       - jwtToken: []
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Utilisateur non trouvé
 */
/**
 * @swagger
 * /api/v1/user/handicaps:
 *   get:
 *     summary: Récupérer les handicaps de l'utilisateur
 *     tags: [User]
 *     security:
 *       - jwtToken: []
 *     responses:
 *       200:
 *         description: Liste des handicaps
 *   post:
 *     summary: Ajouter un handicap à l'utilisateur
 *     tags: [User]
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_handicap
 *             properties:
 *               id_handicap:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Handicap ajouté
 *   delete:
 *     summary: Supprimer un handicap de l'utilisateur
 *     tags: [User]
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_handicap
 *             properties:
 *               id_handicap:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Handicap supprimé
 */

/**
 * @swagger
 * /api/v1/user/avis:
 *   get:
 *     summary: Récupérer les avis créés par l'utilisateur
 *     tags: [User]
 *     security:
 *       - jwtToken: []
 *     responses:
 *       200:
 *         description: Liste des avis
 *   post:
 *     summary: Créer un avis
 *     tags: [User]
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - note
 *               - id_etablissement
 *               - commentaire
 *             properties:
 *               note:
 *                 type: number
 *                 format: int
 *               id_etablissement:
 *                 type: integer
 *               commentaire:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Avis créé
 *       400:
 *         description: Données invalides
 *   delete:
 *     summary: Supprimer un avis créé par l'utilisateur
 *     tags: [User]
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
 *       description: JWT brut sans préfixe "Bearer"
 */

userRouter.get("/", checkRouteJwt, getCurrentUser)
userRouter.put("/", checkRouteJwt, updateUserNomPrenom)
userRouter.delete("/", checkRouteJwt, deleteUserById)

userRouter.get("/handicaps", checkRouteJwt, getUserHandicap)
userRouter.post("/handicaps", checkRouteJwt, addHandicapToUser)
userRouter.delete("/handicaps", checkRouteJwt, deleteHandicapFromUser)

userRouter.get("/avis", checkRouteJwt, getUserAvis)
userRouter.post("/avis", checkRouteJwt, upload.single("photo"), createUserAvis)
userRouter.delete("/avis", checkRouteJwt, deleteAvisFromUser)

export {
    userRouter
}