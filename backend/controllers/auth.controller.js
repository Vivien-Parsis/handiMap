const { generateToken } = require('../services/auth.service')
const { isValidEmail, isStrongPassword } = require('../utils/checks.utils')
const { userModel } = require("../models/user.model")
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const currentUser = { password: req.body.password, email: req.body.email }
    const user = await userModel.findByEmail(currentUser.email)
    
    if (!user || !(await bcrypt.compare(currentUser.password, user.password))) {
        return res.status(401).json({ message: 'Identifiants invalides' })
    }
    const token = generateToken(user)
    res.json({ token })
}

const register = async (req, res) => {
    const currentUser = { password: req.body.password, email: req.body.email, nom: req.body.nom, prenom: req.body.prenom }

    if (!currentUser.password || !currentUser.email || !currentUser.nom || !currentUser.prenom) {
        return res.status(400).json({ message: 'manques des informations' })
    }

    if (!isValidEmail(currentUser.email)) {
        return res.status(400).json({ message: 'emails invalides' })
    }

    if (!isStrongPassword(currentUser.password)) {
        return res.status(400).json({ message: 'mot de passe non robuste' })
    }

    const userFind = await userModel.findByEmail(currentUser.email)
    if (!userFind) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(currentUser.password, salt);
        const newUser = await userModel.create({ email:currentUser.email, passwordHash:hashedPassword, role:'user', nom:currentUser.nom, prenom:currentUser.prenom })
        const token = generateToken({ role: newUser.role, id: newUser.id_user, email: newUser.email })
        return res.status(201).json({ token })
    } else {
        return res.status(409).json({ message: 'utilisateur deja existant' })
    }
}

module.exports = {
    login,
    register
}