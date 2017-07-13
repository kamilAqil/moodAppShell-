var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var passport = require('passport');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var db = require('../models');



router.get('/', function(req, res, next) {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.render('home', {
        title: 'Welcome'
    });
});

router.get('/profile', authenticationMiddleware(), function(req, res) {
    res.render('profile', {
        title: 'Profile'
    })
});

router.get('/login', function(req, res) {
    res.render('login', {
        title: 'Login'
    })
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

router.get('/logout', function(req, res) {
	req.logOut();
	req.session.destroy();
	res.redirect('/');
});


// router.get('/register', function(req, res, next) {
//   res.render('register', { title: 'Registeration' });
// });

router.get('/entry', function(req, res, next) {
    res.render('journalEntry'), {
        title: ' journal'
    };
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', function(req, res, next) {
    req.checkBody('username', 'you must enter a username').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    // going to turn off the password validation must include lowercase just for dev desting
    // req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        console.log(`errors: ${JSON.stringify(errors)}`);
        res.render('register', {
            title: 'registration error',
            errors: errors
        });
    } else {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        bcrypt.hash(password, saltRounds, function(err, hash) {


            db.users.create({
                username: username,
                email: email,
                password: hash
            }).then(function(data) {
                const user_id = data.get('id');
                req.login(user_id, function(err) {

                    res.redirect('/profile');
                });

            });
            // console.log(db);

        });
    }
});

passport.serializeUser(function(user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});


function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    }
}


module.exports = router;