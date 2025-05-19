import request from "supertest"
import { jest } from "@jest/globals"

jest.unstable_mockModule('../config/db.config.js', () => ({
    pool: {
        query: jest.fn()
    }
}))

jest.unstable_mockModule("../models/etablissement.model.js", () => ({
    etablissementModel: {
        create: jest.fn(),
        update: jest.fn(),
        deleteIfOwner: jest.fn(),
        findAllOwnerEtablissement: jest.fn(),
        addHandicaps: jest.fn(),
        deleteHandicaps: jest.fn()
    }
}))

jest.unstable_mockModule('../middlewares/auth.middleware.js', () => ({
    checkOwnerRouteJwt: (req, res, next) => {
        req.user = {
            id_user: 1,
            role: 'owner',
            email: 'test@example.com'
        }
        next()
    },
    checkRouteJwt: (req, res, next) => {
        req.user = {
            id_user: 1,
            role: 'user',
            email: 'test@example.com'
        }
        next()
    },
    checkAdminRouteJwt: (req, res, next) => {
        req.user = {
            id_user: 1,
            role: 'admin',
            email: 'test@example.com'
        }
        next()
    }
}))

const { pool } = await import('../config/db.config.js')
const { app } = await import('../app.js')
const { etablissementModel } = await import("../models/etablissement.model.js")

const token = "fake-jwt-token"
const headers = { Authorization: token }

describe("Routes /owner/etablissements", () => {

    describe("GET /owner/etablissements", () => {
        it("doit retourner tous les établissements de l'utilisateur", async () => {
            etablissementModel.findAllOwnerEtablissement.mockResolvedValue([
                {
                    id_etablissement: 1,
                    nom_etablissement: "Etab 1",
                    adresse: "Adresse 1",
                    type_etablissement: "restaurant",
                    photo_etablissement: "photo.jpg",
                    coordonnees: "coord",
                    id_handicap: null,
                    id_avis: null
                }
            ])

            const res = await request(app)
                .get("/owner/etablissements")
                .set(headers)

            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual(expect.any(Array))
            expect(res.body[0]).toHaveProperty("id_etablissement", 1)
        })
    })

    describe("POST /owner/etablissements", () => {
        it("doit créer un établissement", async () => {
            etablissementModel.create.mockResolvedValue({
                id_etablissement: 1,
                nom: "Nouveau Etab",
                adresse: "123 rue test",
                type: "restaurant",
                photo: "photo.jpg",
                coordonnees: "coords"
            })

            const res = await request(app)
                .post("/owner/etablissements")
                .set(headers)
                .send({
                    nom: "Nouveau Etab",
                    adresse: "123 rue test",
                    type: "restaurant",
                    photo: "photo.jpg",
                    coordonnees: "coords"
                })

            expect(res.statusCode).toBe(201)
            expect(res.body.nom).toBe("Nouveau Etab")
        })
    })

    describe("PUT /owner/etablissements", () => {
        it("doit mettre à jour un établissement appartenant à l'utilisateur", async () => {
            pool.query.mockResolvedValueOnce({
                rows: [{ id_etablissement: 1, id_user: 1 }]
            })
            etablissementModel.update.mockResolvedValue({
                id_etablissement: 1,
                nom: "Modifié",
                adresse: "Adresse modif",
                type: "magasin",
                photo: "photo2.jpg",
                coordonnees: "coords2"
            })

            const res = await request(app)
                .put("/owner/etablissements")
                .set(headers)
                .send({
                    id_etablissement: 1,
                    nom: "Modifié",
                    adresse: "Adresse modif",
                    type: "magasin",
                    photo: "photo2.jpg",
                    coordonnees: "coords2"
                })

            expect(res.statusCode).toBe(200)
            expect(res.body.nom).toBe("Modifié")
        })

        it("doit refuser si l'établissement n'appartient pas à l'utilisateur", async () => {
            pool.query.mockResolvedValueOnce({
                rows: []
            })
            etablissementModel.update.mockResolvedValue(null)

            const res = await request(app)
                .put("/owner/etablissements")
                .set(headers)
                .send({
                    id_etablissement: 99,
                    nom: "Hacker Etab",
                    adresse: "H4ck Street",
                    type: "bar",
                    photo: "hack.jpg",
                    coordonnees: "h4ck"
                })

            expect(res.statusCode).toBe(403)
            expect(res.body.message).toBe("cet etablissement ne vous appartient pas")
        })
    })

    describe("DELETE /owner/etablissements", () => {
        it("doit supprimer un établissement appartenant à l'utilisateur", async () => {
            etablissementModel.deleteIfOwner.mockResolvedValue({
                id_etablissement: 1,
                nom: "Supprimé"
            })

            const res = await request(app)
                .delete("/owner/etablissements")
                .set(headers)
                .send({ id_etablissement: 1 })

            expect(res.statusCode).toBe(200)
            expect(res.body.nom).toBe("Supprimé")
        })

        it("doit refuser la suppression si non propriétaire", async () => {
            etablissementModel.deleteIfOwner.mockResolvedValue(null)

            const res = await request(app)
                .delete("/owner/etablissements")
                .set(headers)
                .send({ id_etablissement: 999 })

            expect(res.statusCode).toBe(403)
            expect(res.body.message).toBe("cet etablissement ne vous appartient pas")
        })
    })
})