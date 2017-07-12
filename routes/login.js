var express = require('express');
var expressValidator = require('express-validator');
var router = express.Router();

var passport = require('passport');
var bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/register', function(req, res, next) {
    res.render('register', {
        title: 'Registration'
    });
});

router.get('/', function(req, res) {
    res.render('home', {
        title: 'Welcome'
    });
});

router.post('/register', function(req, res, next) {

    req.checkBody('username', 'you must enter a username').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

    // Additional validation to ensure username is alphanumeric with underscores and dashes
    req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');

    req.getValidationResult().then(function(errors) {
        
        if (!errors.isEmpty()) {
            // do something with the errors
            console.log(`errors: ${JSON.stringify(errors)}`)
            res.render('register', {
                title: 'registration error',
                errors: errors
            });
        } else {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;



            // const db = require('../db.js');
            const db =  require('../models/users.js');

            bcrypt.hash(password, saltRounds, function(err, hash) {

                // db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], function(error, results, fields) {
                //     if (error) throw error;

                //     db.query('SELECT LAST_INSERT_ID() as user_id', function(error, results, fields) {
                //         if (error) throw error;

                //         const user_id = results[0];
                //         console.log(user_id);
                //         req.login(user_id, function(err) {
                //             res.redirect('/');
                //         });
                //     });
                // });
                
            });
        }
    });
});

passport.serializeUser(function(user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

module.exports = router;