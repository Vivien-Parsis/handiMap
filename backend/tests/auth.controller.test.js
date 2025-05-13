const request = require("supertest")
const { app } = require("../app")
const bcrypt = require('bcrypt')

jest.mock('../models/user.model')
jest.mock('../services/auth.service')

const { userModel } = require('../models/user.model')
const { generateToken } = require('../services/auth.service')


describe('Auth Routes', () => {
    describe('POST /auth/register', () => {
        it('doit créer un utilisateur et retourner un token', async () => {
            const mockUser = {
                nom: 'John',
                prenom: 'Doe',
                email: 'john@example.com',
                password: 'StrongPass123!'
            }
            userModel.findByEmail.mockResolvedValue(null)
            userModel.create.mockResolvedValue({ id_user: 1 })
            generateToken.mockReturnValue('fake-jwt-token')

            const res = await request(app)
                .post('/auth/register')
                .send(mockUser)

            expect(res.statusCode).toBe(201)
            expect(res.body).toEqual({ token: 'fake-jwt-token' })
        })

        it('doit refuser si email déjà utilisé', async () => {
            const mockUser = {
                email: 'test@example.com',
                password: 'StrongPass123!',
                nom: 'Doe',
                prenom: 'Jane'
            }
            userModel.findByEmail.mockResolvedValue({ id_user: 1 })

            const res = await request(app)
                .post('/auth/register')
                .send(mockUser)

            expect(res.statusCode).toBe(409)
            expect(res.body.message).toBe('utilisateur deja existant')
        })
    })

    describe('POST /auth/login', () => {
        it('doit connecter un utilisateur avec le bon mot de passe', async () => {
            const mockUser = {
                email: 'test@example.com',
                password: 'StrongPass123!'
            }
            userModel.findByEmail.mockResolvedValue({
                id_user: 1,
                mail: 'test@example.com',
                password: await bcrypt.hash('StrongPass123!', 10),
                role: 'user'
            })
            generateToken.mockReturnValue('login-token')

            const res = await request(app)
                .post('/auth/login')
                .send(mockUser)

            expect(res.statusCode).toBe(200)
            expect(res.body.token).toBe('login-token')
        })

        it('doit échouer avec un mauvais mot de passe', async () => {
            const mockUser = {
                email: 'test@example.com',
                password: 'WrongPassword!'
            }
            userModel.findByEmail.mockResolvedValue({
                id_user: 1,
                email: 'test@example.com',
                password: await bcrypt.hash('StrongPass123!', 10),
                role: 'user'
            })

            const res = await request(app)
                .post('/auth/login')
                .send(mockUser)

            expect(res.statusCode).toBe(401)
            expect(res.body.message).toBe('Identifiants invalides')
        })
    })
})