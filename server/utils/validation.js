// Validation 
const Joi = require('@hapi/joi');

// Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required().messages({
            'string.min': `Le longueur de votre username doit faire 6 caractères minimum`,
            'string.empty': `Vous devez saisir votre nom d'utilisateur`
        }),
        email: Joi.string().min(6).required().email().error(new Error('Vous devez saisir une adresse mail valide')),
        password: Joi.string().min(8).required().messages({
            'string.min': `Le longueur de votre mot de passe doit faire 8 caractères minimum`,
            'string.empty': `Vous devez saisir votre mot de passe`
        }),
    })
    return schema.validate(data);
}

// Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email().error(new Error('Vous devez saisir une adresse mail valide')),
        password: Joi.string().required().error(new Error('Vous devez saisir votre mot de passe'))
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;