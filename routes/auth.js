const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route      GET api/auth
// @desc       get logged in user
// @access     private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route      POST api/auth
// @desc       auth user and get token
// @access     public
router.post('/', [
    check('email', 'Enter a valid Email').isEmail(),
    check('password', 'Password is Required').exists()
],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if(!user){
            return status(400).json({msg: "invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({msg: "invalid credentials"});
        }

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