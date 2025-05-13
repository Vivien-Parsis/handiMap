const isValidEmail = (email) => {
    if (typeof email != "string") {
        return false
    }
    if (email.trim() == "") {
        return false
    }
    const pattern = /[a-zA-Z0-9._\-]{1,30}[@][a-zA-Z0-9._\-]{4,12}[.]{1}[a-zA-Z]{2,4}/gm
    const match = email.match(pattern) || undefined
    if (match == undefined) {
        return false
    }
    return match.length == 1 && match[0].length == email.length
}

const isStrongPassword = (password) => {
    return password.length >= 6 && password.length <= 30 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)
}

export{ isValidEmail, isStrongPassword }