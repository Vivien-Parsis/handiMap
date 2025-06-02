import { getAllHandicaps } from "../controllers/handicap.controller.js"
import { Router } from "express"
const handicapRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Handicap
 *   description: Opérations liées aux types de handicaps
 */

/**
 * @swagger
 * /api/v1/handicaps:
 *   get:
 *     summary: Récupérer tous les types de handicaps
 *     tags: [Handicap]
 *     responses:
 *       200:
 *         description: Liste des handicaps
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_handicap:
 *                     type: integer
 *                   nom_handicap:
 *                     type: string
 *                   type_handicap:
 *                     type: string
 *       500:
 *         description: Erreur serveur
 */
handicapRouter.get("/", getAllHandicaps)

export {
    handicapRouter
}