//Instantiate Variables
var User = require('../model/User');
var FamilyMember = require('../model/FamilyMember');
var Physician = require('../model/Physician');
var BoardPost = require('../model/BoardPost');
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

//Creates a physician and returns error if email already used
database.createNewPhysician = function(req, res, next) {
    var password;

    var SALT_WORK_FACTOR = 10;

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) return next(err);

            var email = req.body.email;
            var password = hash;
            var username = req.body.username;
            var newPhysician = new Physician({
                email: email,
                username: username,
                password: password,
                field: "neurology",
                hospital: true,
                treatedrare: true,
                forumrec: true,
                patientsask: true
            });

            newPhysician.save(function(err) {
                if (err) throw err;

                console.log(
                    'Physician saved successfully!');
                console.log("Physician name is: ", email,
                    "password hash is: ",
                    password);
                res.json({
                    success: true
                });
            });
        });
    });
};

//Creates a family member and returns error if email already used
database.createNewFamilyMember = function(req, res, next) {
    var password;

    var SALT_WORK_FACTOR = 10;

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) return next(err);

            var email = req.body.email;
            var password = hash;
            var username = req.body.username;
            var newFamilyMember = new FamilyMember({
                email: email,
                username: username,
                password: password,
                patientRelationship: "brother",
                careprovider: true,
                patientaccountp: "patient stuff",
                joinreason: "I want to find out about life",
                patientdisease: "Kabooki",
                patientdoctor: "Dr. Yolo",
                diseaseduration: "5 years",
                diseasetreatment: "I wish I knew",
                sharedata: true,
                forumrec: true,
                legalsave: true
            });

            newFamilyMember.save(function(err) {
                if (err) throw err;

                console.log(
                    'Family member saved successfully!');
                console.log("Family member name is: ", email,
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
    var userFound = false;
    var userType = "None"
    var mailName = req.body.email;
    var passName = req.body.password;
    User.findOne({
        email: mailName
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            // res.json({
            //     success: false,
            //     message: 'Authentication failed. User not found.'
            // });
        } else if (user) {
            userFound = true;
            userType = "User";
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

    FamilyMember.findOne({
        email: mailName
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            // res.json({
            //     success: false,
            //     message: 'Authentication failed. User not found.'
            // });
        } else if (user) {
            userFound = true;
            userType = "FamilyMember";
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

    Physician.findOne({
        email: mailName
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            // res.json({
            //     success: false,
            //     message: 'Authentication failed. User not found.'
            // });
        } else if (user) {
            userFound = true;
            userType = "Physician";
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

//Posts a boardPost to the database
database.postBoardPost = function(req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    var userId = req.decoded._doc._id;

    console.log("Got postBoardPost request: " + req.body);

    User.findById(userId, function(err, user) {
        if (err) throw err;

        console.log("Found user: " + userId);
        var boardPost = new BoardPost({
            title: title,
            content: content,
            userId: user._id
        });

        boardPost.save(function(err) {
            if (err) throw err;

            console.log(
                "Successfully added boardPost " +
                title + " by " + user.email
            );

            res.json({
                success: true
            });
        });
    });
};

database.getBoardPost = function(req, res, next) {
    var boardPostId = req.params.id;

    console.log("Got getBoardPost request");

    BoardPost.findById(boardPostId, function(err, boardPost) {
        if (err) throw err;

        console.log("Found boardPost: " + boardPostId);

        Comment.find({
                boardPostId: boardPost._id
            })
            .exec(function(err, comments) {
                if (err) throw err;
                res.json({
                    boardPost: boardPost,
                    comments: comments
                });
            });
    });
};

database.postComment = function(req, res, next) {
    var boardPostId = req.params.id;
    var content = req.body.content;
    var userId = req.decoded._doc._id;

    console.log(req);
    console.log(req.body);

    BoardPost.findById(boardPostId, function(err, boardPost) {
        if (err) throw err;

        console.log("Found boardPost: " + boardPostId);
        var comment = new Comment({
            content: content,
            userId: userId,
            boardPostId: boardPost._id
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

// Returns top 20 BoardPosts, first by votes and then by date posted
database.getFeed = function(req, res) {
    console.log("Got getFeed request");

    BoardPost.find()
        .limit(20)
        .sort({
            votes: -1,
            posted: -1
        })
        .exec(function(err, boardPosts) {
            if (err) throw err;

            res.json(boardPosts);
        });
};


module.exports = database;
