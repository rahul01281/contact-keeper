const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route      GET api/contacts
// @desc       get all users contacts
// @access     private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error')
    }
});

// @route      GET api/contacts
// @desc       add new contact
// @access     private
router.post('/', (req, res) => {
    res.send('add new contact');
});

// @route      GET api/contacts/:id
// @desc       update contact
// @access     private
router.put('/:id', (req, res) => {
    res.send('update contact');
});

// @route      GET api/contacts
// @desc       delete contact
// @access     private
router.get('/:id', (req, res) => {
    res.send('delete contact');
});

module.exports = router;