var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var passport = require('passport');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var db = require('../models');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var tone_analyzer = new ToneAnalyzerV3({
  username: '62468a6c-fc11-468e-a2cb-3f484ac99f8b',
  password: 'MwHQbHMKMkFO',
  version_date: '2016-05-19'
});
// var user_id;






router.get('/', function (req, res, next) {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.render('home', {
        title: 'Welcome'
    });
});

// router.get('/profile', authenticationMiddleware(), function (req, res) {
//     res.render('profile', {
//         title: 'Profile'
//     })
// });

router.get('/login', function (req, res) {
    res.render('login', {
        title: 'Login'
    })
});



router.post('/login', passport.authenticate('local', {
    successRedirect: '/userDash',
    failureRedirect: '/login'
}), function (req, res) {
 
});

router.get('/logout', function (req, res) {
    req.logOut();
    req.session.destroy();
    res.redirect('/login');
});


// router.get('/register', function(req, res, next) {
//   res.render('register', { title: 'Registeration' });
// });

router.get('/entry',authenticationMiddleware(), function (req, res, next) {
    res.render('journalEntry'), {
        title: ' journal'
    };
});

router.post('/entry',authenticationMiddleware(), function (req, res, next) {

    var params = {
    // Get the text from the JSON file.
    text: req.body.moodEntry
    };

    tone_analyzer.tone(params, function(error, response) {
    if (error)
        console.log('error:', error);
    else

        console.log(typeof(response.document_tone.tone_categories[0].tones[3].score));
        db.Post.create({
            
            body: req.body.moodEntry,
            userId: req.user.user_id,
            joy: response.document_tone.tone_categories[0].tones[3].score ,
            sadness:response.document_tone.tone_categories[0].tones[4].score



        })
        .then(function (dbPost) {
            res.redirect('userDash'), { title: 'User Dashboard' };
        });
    });


});

router.get('/userDash',authenticationMiddleware(), function (req, res, next) {
    console.log("-----");
    console.log(req.user);
    console.log("---------");
    var query = {};
    if (req.user){
        query.userId =req.user.user_id
    }
    db.Post.findAll({
      where: query,
      include: [db.users]
    }).then(function(dbPost) {
           var hbsObject = {
                Post: dbPost
            };
      res.render('userDash', hbsObject), { title: 'User Dashboard' };
    });
    
});

router.get('/userDetailedHistory', function (req, res, next) {
    res.render('userDetailedHistory'), { title: 'User Detailed History' };
});

router.get('/register', function (req, res, next) {
    res.render('register');
});

router.post('/register', function (req, res, next) {
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

        bcrypt.hash(password, saltRounds, function (err, hash) {


            db.users.create({
                username: username,
                email: email,
                password: hash
            }).then(function (data) {
                const user_id = data.get('id');
                req.login(user_id, function (err) {

                    res.redirect('/userDash');
                });

            });
            // console.log(db);

        });
    }
});



passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
});


function authenticationMiddleware() {
    return (req, res, next) => {

        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    }
};




module.exports = router;