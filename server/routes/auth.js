const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');
const {registerValidation,loginValidation} = require('../utils/validation');
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res) => {
    // Validation
    const validation = registerValidation(req.body)
    if(validation.error) return res.status(422).send(validation.error.message)
    
    // Checking if the user is already in the database 
    const emailExist = await User.findOne({email: req.body.email});
    const usernameExist = await User.findOne({username: req.body.username});
    if(emailExist) return res.status(401).send(`L'adresse mail existe déjà`);
    if(usernameExist) return res.status(401).send(`Le nom d'utilisateur n'est pas disponible`);

    // Hash the password 
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password,salt);

    // Create new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    // Save new user
    user.save()
    .then(doc => {
        const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);
        res.header('x-access-token',token).send({user_id: user.id});
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

router.post('/login', async (req,res) => {
    // Validation
    const validation = loginValidation(req.body);
    if(validation.error) return res.status(422).send(validation.error.message);

    // Checking if the user exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(401).send("Le nom d'utilisateur ou le mot de passe est incorrect");

    // Hash the password 
    const validPassword = await bcryptjs.compare(req.body.password,user.password);
    if(!validPassword) return res.status(401).send("Le nom d'utilisateur ou le mot de passe est incorrect");

    // Create and assign token 
    const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);
    res.header('x-access-token',token).send({user_id: user.id,username: user.username});
})
module.exports = router;