//Instantiate Variables
var User = require('../model/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var database = {};

//Creates a user and returns error if email already used
database.createNewUser = function(req, res, next) {
    var password;

    var SALT_WORK_FACTOR = 10;

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) return next(err);

            var email = req.body.email;
            var password = hash;
            var username = req.body.username;
            var newUser = new User({
                email: email,
                username: username,
                password: password
            });

            newUser.save(function(err) {
                if (err) throw err;

                console.log(
                    'User saved successfully!');
                console.log("User name is: ", email,
                    "password hash is: ",
                    password);
                res.json({
                    success: true
                });
            });
        });
    });
};

//Authenticates user and returns error if login failed
database.authenticateUser = function(req, res, next) {
    var mailName = req.body.email;
    var passName = req.body.password;
    User.findOne({
        email: mailName
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {

            bcrypt.compare(req.body.password, user.password,
                function(err, isMatch) {
                    if (err) throw err;
                    if (!isMatch) {
                        res.json({
                            success: false,
                            message: 'Authentication failed. Wrong password.'
                        });
                    } else {
                        // if user is found and password is right
                        // create a token
                        var token = jwt.sign(user,
                            'secretKeyGoesHere', {
                                expiresIn: 86400 // expires in 24 hours
                            });
                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }
                });
        }
    });
};

//Posts a challenge to the database
database.postChallenge = function(req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    var userId = req.decoded._doc._id;

    console.log("Got postChallenge request: " + req.body);

    User.findById(userId, function(err, user) {
        if (err) throw err;

        console.log("Found user: " + userId);
        var challenge = new Challenge({
            title: title,
            content: content,
            userId: user._id
        });

        challenge.save(function(err) {
            if (err) throw err;

            console.log(
                "Successfully added challenge " +
                title + " by " + user.email
            );

            res.json({
                success: true
            });
        });
    });
};

database.getChallenge = function(req, res, next) {
    var challengeId = req.params.id;

    console.log("Got getChallenge request");

    Challenge.findById(challengeId, function(err, challenge) {
        if (err) throw err;

        console.log("Found challenge: " + challengeId);

        Comment.find({
                challengeId: challenge._id
            })
            .exec(function(err, comments) {
                if (err) throw err;
                res.json({
                    challenge: challenge,
                    comments: comments
                });
            });
    });
};

database.postComment = function(req, res, next) {
    var challengeId = req.params.id;
    var content = req.body.content;
    var userId = req.decoded._doc._id;

    console.log(req);
    console.log(req.body);

    Challenge.findById(challengeId, function(err, challenge) {
        if (err) throw err;

        console.log("Found challenge: " + challengeId);
        var comment = new Comment({
            content: content,
            userId: userId,
            challengeId: challenge._id
        });

        comment.save(function(err) {
            if (err) throw err;

            console.log(
                "Successfully added comment " +
                content + " by " + userId);

            res.json({
                success: true
            });
        });
    });
};

// Returns top 20 Challenges, first by votes and then by date posted
database.getFeed = function(req, res) {
    console.log("Got getFeed request");

    Challenge.find()
        .limit(20)
        .sort({
            votes: -1,
            posted: -1
        })
        .exec(function(err, challenges) {
            if (err) throw err;

            res.json(challenges);
        });
};

database.getProfile = function(req, res, next) {

    console.log("Got getProfile request");

    // TODO: mongofy

    res.status(200);
    next();
};

module.exports = database;
