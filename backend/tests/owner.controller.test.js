import request from "supertest"
import { jest } from "@jest/globals"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
            mail: 'test@example.com'
        }
        next()
    },
    checkRouteJwt: (req, res, next) => {
        req.user = {
            id_user: 1,
            role: 'user',
            mail: 'test@example.com'
        }
        next()
    },
    checkAdminRouteJwt: (req, res, next) => {
        req.user = {
            id_user: 1,
            role: 'admin',
            mail: 'test@example.com'
        }
        next()
    }
}))

const { pool } = await import('../config/db.config.js')
const { app } = await import('../app.js')
const { etablissementModel } = await import("../models/etablissement.model.js")

const token = "fake-jwt-token"
const headers = { Authorization: "Bearer " + token }
beforeAll(() => {
    jest.setTimeout(10000);
})
describe("Routes /api/v1/owners/etablissements", () => {
    describe("GET /api/v1/owners/etablissements", () => {
        it("doit retourner tous les établissements de l'utilisateur", async () => {
            etablissementModel.findAllOwnerEtablissement.mockResolvedValue([
                {
                    id_etablissement: 1,
                    nom_etablissement: "Etab 1",
                    adresse: "Adresse 1",
                    type_etablissement: "restaurant",
                    photo_etablissement: "photo.jpg",
                    coordonnees: "1.1;1.1",
                    id_handicap: null,
                    id_avis: null
                }
            ])

            const res = await request(app)
                .get("/api/v1/owners/etablissements")
                .set(headers)

            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual(expect.any(Array))
            expect(res.body[0]).toHaveProperty("id_etablissement", 1)
        })
    })

    describe("POST /api/v1/owners/etablissements", () => {
        it("doit créer un établissement", async () => {

            const mockValue = {
                id_etablissement: 1,
                nom: "Nouveau Etab",
                adresse: "Adresse",
                type: "magasin",
                photo: "test.jpg",
                coordonnees: "1.1;1.1"
            }
            etablissementModel.create.mockResolvedValue(mockValue)

            const res = await request(app)
                .post("/api/v1/owners/etablissements")
                .set(headers)
                .attach("photo", path.join(__dirname, mockValue.photo))
                .field("nom", mockValue.nom)
                .field("adresse", mockValue.adresse)
                .field("type", mockValue.type)
                .field("coordonnees", mockValue.coordonnees)


            expect(res.statusCode).toBe(201)
            expect(res.body.nom).toBe("Nouveau Etab")
        }, 10000)
    })

    describe("PUT /api/v1/owners/etablissements", () => {
        it("doit mettre à jour un établissement appartenant à l'utilisateur", async () => {
            pool.query.mockResolvedValueOnce({
                rows: [{ id_etablissement: 1, id_user: 1 }]
            })
            const mockValue = {
                id_etablissement: 1,
                nom: "Modifié",
                adresse: "Adresse modif",
                type: "magasin",
                photo: "test.jpg",
                coordonnees: "1.1;1.1"
            }
            etablissementModel.update.mockResolvedValue(mockValue)

            const res = await request(app)
                .put("/api/v1/owners/etablissements")
                .set(headers)
                .attach("photo", path.join(__dirname, mockValue.photo))
                .field("id_etablissement", mockValue.id_etablissement)
                .field("nom", mockValue.nom)
                .field("adresse", mockValue.adresse)
                .field("type", mockValue.type)
                .field("coordonnees", mockValue.coordonnees)

            expect(res.statusCode).toBe(200)
            expect(res.body.nom).toBe("Modifié")
        })

        it("doit refuser si l'établissement n'appartient pas à l'utilisateur", async () => {
            pool.query.mockResolvedValueOnce({
                rows: []
            })
            etablissementModel.update.mockResolvedValue(null)

            const res = await request(app)
                .put("/api/v1/owners/etablissements")
                .set(headers)
                .attach("photo", path.join(__dirname, "test.jpg"))
                .field("id_etablissement", 99)
                .field("nom", "Hacker Etab")
                .field("adresse", "H4ck Street")
                .field("type", "bar")
                .field("coordonnees", "1.1;1.1")

            expect(res.statusCode).toBe(403)
            expect(res.body.message).toBe("cet etablissement ne vous appartient pas")
        })
    })

    describe("DELETE /api/v1/owners/etablissements", () => {
        it("doit supprimer un établissement appartenant à l'utilisateur", async () => {
            etablissementModel.deleteIfOwner.mockResolvedValue({
                id_etablissement: 1,
                nom: "Supprimé"
            })

            const res = await request(app)
                .delete("/api/v1/owners/etablissements")
                .set(headers)
                .send({ id_etablissement: 1 })

            expect(res.statusCode).toBe(200)
            expect(res.body.nom).toBe("Supprimé")
        })

        it("doit refuser la suppression si non propriétaire", async () => {
            etablissementModel.deleteIfOwner.mockResolvedValue(null)

            const res = await request(app)
                .delete("/api/v1/owners/etablissements")
                .set(headers)
                .send({ id_etablissement: 999 })

            expect(res.statusCode).toBe(403)
            expect(res.body.message).toBe("cet etablissement ne vous appartient pas")
        })
    })
})
