import { generateToken } from '../services/auth.service.js'
import { userModel } from '../models/user.model.js'
import bcrypt from 'bcrypt'
import vine, { errors } from '@vinejs/vine'

const login = async (req, res) => {
    const schema = vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(6).maxLength(30).regex(/[A-Z]/).regex(/[a-z]/).regex(/\d/).regex(/[^a-zA-Z0-9]/),
    })
    const currentUser = { password: req.body.password, email: req.body.email }
    try {
        const validator = vine.compile(schema)
        await validator.validate(currentUser)
        const user = await userModel.findByEmail(currentUser.email)
        console.log(user)
        if (!user || !(await bcrypt.compare(currentUser.password, user.password))) {
            return res.status(401).json({ message: 'Identifiants invalides' })
        }
        const token = generateToken(user)
        res.status(200).json({ token })
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            res.status(error.status).send(error.messages);
        }
    }
}

const register = async (req, res) => {
    const schema = vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(6).maxLength(30).regex(/[A-Z]/).regex(/[a-z]/).regex(/\d/).regex(/[^a-zA-Z0-9]/).confirmed(),
        nom: vine.string().minLength(1).maxLength(50).regex(/^[a-zA-Z]+$/),
        prenom: vine.string().minLength(1).maxLength(50).regex(/^[a-zA-Z]+$/)
    })

    const currentUser = {
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom
    }

    try {
        const validator = vine.compile(schema)
        await validator.validate(currentUser)
        const userFind = await userModel.findByEmail(currentUser.email)
        if (!userFind) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(currentUser.password, salt);
            const newUser = await userModel.create({ email: currentUser.email, passwordHash: hashedPassword, role: 'user', nom: currentUser.nom, prenom: currentUser.prenom })
            const token = generateToken({ role: newUser.role, id: newUser.id_user, email: newUser.email })
            return res.status(201).json({ token })
        } else {
            return res.status(409).json({ message: 'utilisateur deja existant' })
        }
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            res.status(error.status).send(error.messages);
        }
    }
}

export {
    login,
    register
}