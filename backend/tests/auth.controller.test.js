import request from "supertest"
import bcrypt from "bcrypt"
import { jest } from "@jest/globals"

jest.unstable_mockModule('../models/user.model', () => ({
    userModel: {
        findByMail: jest.fn(),
        create: jest.fn()
    }
}))

jest.unstable_mockModule('../services/auth.service', () => ({
    generateToken: jest.fn()
}))

const { app } = await import('../app.js')
const { userModel } = await import('../models/user.model.js')
const { generateToken } = await import('../services/auth.service.js')


describe('Auth Routes', () => {
    describe('POST /api/v1/auth/register', () => {
        it('doit créer un utilisateur et retourner un token', async () => {
            const mockUser = {
                nom: 'John',
                prenom: 'Doe',
                mail: 'john@example.com',
                password: 'StrongPass123!',
                password_confirmation: 'StrongPass123!',
                rgpd: true
            }
            userModel.findByMail.mockResolvedValue(null)
            userModel.create.mockResolvedValue(mockUser)
            generateToken.mockReturnValue('fake-jwt-token')

            const res = await request(app)
                .post('/api/v1/auth/register')
                .send(mockUser)

            expect(res.statusCode).toBe(201)
            expect(res.body).toEqual({ token: 'fake-jwt-token' })
        })

        it('doit refuser si mail déjà utilisé', async () => {
            const mockUser = {
                mail: 'test@example.com',
                password: 'StrongPass123!',
                password_confirmation: 'StrongPass123!',
                nom: 'Doe',
                prenom: 'Jane',
                rgpd: true
            }
            userModel.findByMail.mockResolvedValue({ id_user: 1 })

            const res = await request(app)
                .post('/api/v1/auth/register')
                .send(mockUser)

            expect(res.statusCode).toBe(409)
            expect(res.body.message).toBe('utilisateur deja existant')
        })
    })

    describe('POST /api/v1/auth/login', () => {
        it('doit connecter un utilisateur avec le bon mot de passe', async () => {
            const mockUser = {
                mail: 'test@example.com',
                password: 'StrongPass123!'
            }
            userModel.findByMail.mockResolvedValue({
                id_user: 1,
                mail: 'test@example.com',
                password: await bcrypt.hash('StrongPass123!', 10),
                role: 'user'
            })
            generateToken.mockReturnValue('login-token')

            const res = await request(app)
                .post('/api/v1/auth/login')
                .send(mockUser)

            expect(res.statusCode).toBe(200)
            expect(res.body.token).toBe('login-token')
        })

        it('doit échouer avec un mauvais mot de passe', async () => {
            const mockUser = {
                mail: 'test@example.com',
                password: 'WrongPassword1!'
            }
            userModel.findByMail.mockResolvedValue({
                id_user: 1,
                mail: 'test@example.com',
                password: await bcrypt.hash('StrongPass123!', 10),
                role: 'user'
            })

            const res = await request(app)
                .post('/api/v1/auth/login')
                .send(mockUser)

            expect(res.statusCode).toBe(401)
            expect(res.body.message).toBe('Identifiants invalides')
        })
    })
})