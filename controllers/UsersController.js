// Include dependencies
const util = require('util');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
// Include the User model
const User = require('../models/User');
// Create user
router.post('/', (req, res) => {
    // Define validation rules
    req.checkBody({
        'name': {
            notEmpty: true,
            errorMessage: 'The name could not be empty'
        },
        'email': {
            notEmpty: {
                errorMessage: 'The email could not be empty'
            },
            isEmail: {
                errorMessage: 'The email must be valid'
            }
        },
        'password': {
            notEmpty: true,
            errorMessage: 'The password could not be empty'
        },
    });
    req.getValidationResult().then((result) => {
        if (result.isEmpty()) {
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }, (err, user) => {
                if (err) return res.status(500).send("There was a problem addding the information to the database.");

                res.status(200).send(user);
            });
        }

        res.json(result.array());
    })
});

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send("There was an error finding all users");

        res.status(200).send(users);
    })
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.name +" was deleted.");
    });
});

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

module.exports = router;