const express = require('express');
const router = express.Router();

// @route      GET api/contacts
// @desc       get all users contacts
// @access     private
router.get('/', (req, res) => {
    res.send('get all contacts');
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