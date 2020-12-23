const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

// @route      POST api/users
// @desc       register a user
// @access     public
router.post('/', [
    //sets the checks
    check('name', 'Enter Name').not().isEmpty(),
    check('email', 'Enter valid Email').isEmail(),
    check('password', 'Enter a password with 6 or more characters').isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        //check is user exists with that email

        //find user by email
        let user = await User.findOne({email: email})

        if(user) {
            res.status(400).json({msg: "User Already Exists"});
        }

        //create new instance of user
        user = new User({
            name,
            email,
            password
        });

        //hash the password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //payload is the object we will send in the token
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (error, token) => {
            if (error){
                throw error;
            } else {
                res.json({ token });
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

module.exports = router;