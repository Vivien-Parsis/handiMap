import { generateToken } from "../services/auth.service.js"
import { userModel } from "../models/index.js"
import bcrypt from "bcrypt"
import vine, { errors } from "@vinejs/vine"

const login = async (req, res) => {
    const schema = vine.object({
        mail: vine.string().email(),
        password: vine.string().minLength(12).maxLength(30).regex(/[A-Z]/).regex(/[a-z]/).regex(/\d/).regex(/[^a-zA-Z0-9]/).ascii(),
    })
    const currentUser = { password: req.body.password, mail: req.body.mail }
    try {
        const validator = vine.compile(schema)
        await validator.validate(currentUser)
        const user = await userModel.findByMail(currentUser.mail)
        if (!user || !(await bcrypt.compare(currentUser.password, user.password))) {
            return res.status(401).json({ message: 'Identifiants invalides' })
        }
        const token = generateToken(user)
        res.status(200).json({ token })
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            res.status(error.status).send(error.messages)
        }
    }
}

const register = async (req, res) => {
    const schema = vine.object({
        mail: vine.string().email(),
        password: vine.string().minLength(12).maxLength(30).regex(/[A-Z]/).regex(/[a-z]/).regex(/\d/).regex(/[^a-zA-Z0-9]/).confirmed().ascii(),
        nom: vine.string().minLength(1).maxLength(50).regex(/^[a-zA-Z]+$/),
        prenom: vine.string().minLength(1).maxLength(50).regex(/^[a-zA-Z]+$/),
        rgpd: vine.accepted()
    })

    const currentUser = {
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        mail: req.body.mail,
        nom: req.body.nom,
        prenom: req.body.prenom,
        rgpd: req.body.rgpd
    }
    try {
        const validator = vine.compile(schema)
        await validator.validate(currentUser)
        const userFind = await userModel.findByMail(currentUser.mail)
        if (!userFind) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(currentUser.password, salt)
            const newUser = await userModel.create({ mail: currentUser.mail, passwordHash: hashedPassword, role: 'user', nom: currentUser.nom, prenom: currentUser.prenom })
            const token = generateToken(newUser)
            return res.status(201).json({ token })
        } else {
            return res.status(409).json({ message: 'utilisateur deja existant' })
        }
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            res.status(error.status).send(error.messages)
        }
    }
}

export {
    login,
    register
}
