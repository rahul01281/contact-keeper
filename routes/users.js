const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route      POST api/users
// @desc       register a user
// @access     public
router.post('/', [
    //sets the checks
    check('name', 'Enter Name').not().isEmpty(),
    check('email', 'Enter valid Email').isEmail(),
    check('password', 'Enter a password with 6 or more characters').isLength({min: 6})
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    res.send('passed');
});

module.exports = router;