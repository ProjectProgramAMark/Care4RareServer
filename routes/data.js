var express = require('express');
var database = require('../middleware/database');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.post('/newUser', function(req, res, next) {
    database.createNewUser(req, res, next);
});

router.post('/newFamilyMember', function(req, res, next) {
    database.createNewFamilyMember(req, res, next);
});

router.post('/newPhysician', function(req, res, next) {
    database.createNewPhysician(req, res, next);
});

router.post('/login', function(req, res, next) {
    database.authenticateUser(req, res, next);
});

router.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers.Authorization ||req.body.token || req.query.token || req.headers['x_access_token'];
    console.log("token is: ", token);
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, "secretKeyGoesHere", function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});



/* THIS IS FROM THE OLD THING OK DON'T LOOOOOK
// // for upvotes/downvotes
// router.post('/feed/:id/upvote', function(req, res, next) {
//     votes.upvoteChallenge(req, res, next);
// });
//
// router.post('/feed/:id/downvote', function(req, res, next) {
//     votes.downvoteChallenge(req, res, next);
// });
//
// router.route('/updateComment')
//     .put(function(req, res, next) {
//         console.log("[ERROR] updateComment not implemented!");
//     });
// router.post('/newChallenge', function(req, res, next) {
//     database.postChallenge(req, res, next);
// });
//
// router.get('/feed', function(req, res, next) {
//     database.getFeed(req, res, next);
// });
//
// router.get('/profile', function(req, res, next) {
//     database.getProfile(req, res, next);
// });
// router.route('/feed/:id')
//     .get(function(req, res, next) {
//         database.getChallenge(req, res, next);
//     })
//     .post(function(req, res, next) {
//         database.postComment(req, res, next);
//     });

*/

module.exports = router;
