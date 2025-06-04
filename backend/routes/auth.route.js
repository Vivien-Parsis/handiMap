import { login, register } from "../controllers/auth.controller.js"
import { Router } from "express"
import { rateLimiter } from "../middlewares/rateLimiter.middleware.js"
const authRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification des utilisateurs
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Connexion d’un utilisateur existant
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 description: >
 *                   Mot de passe entre 6 et 30 caractères, contenant au moins une majuscule, une minuscule, un chiffre et un caractère spécial.
 *     responses:
 *       200:
 *         description: Authentification réussie, retourne un token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Identifiants invalides
 *       422:
 *         description: Erreur de validation
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Enregistrement d’un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - password_confirmation
 *               - nom
 *               - prenom
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 description: >
 *                   Mot de passe entre 6 et 30 caractères, contenant au moins une majuscule, une minuscule, un chiffre et un caractère spécial.
 *               password_confirmation:
 *                 type: string
 *               nom:
 *                 type: string
 *                 description: Nom (lettres uniquement)
 *               prenom:
 *                 type: string
 *                 description: Prénom (lettres uniquement)
 *     responses:
 *       201:
 *         description: Utilisateur créé, retourne un token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       409:
 *         description: Utilisateur déjà existant
 *       422:
 *         description: Erreur de validation
 */

authRouter.post("/login", login, rateLimiter)
authRouter.post("/register", register, rateLimiter)

export {
    authRouter
}