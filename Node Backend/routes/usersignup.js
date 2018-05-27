var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/userInfo');
var Review = require('../model/Review');


router.post('/login',function(req,res,next){
  User.authenticate(req.body.ID, req.body.password, function (error, user) {
        if (error || !user) {
          res.status(401).send();
        } else {
          res.status(201).send(user);
        }
      });
});

router.post('/', function(req, res, next) {
  if (req.body.ID && req.body.password && req.body.designation) {
  var userData = {
    ID: req.body.ID,
    password: req.body.password,
    designation: req.body.designation,
    firstName:req.body.firstName,
    lastName:req.body.lastName
  }
  User.create(userData, function (err, user) {
    if (err) {
      res.send('There was a problem adding info to the DB ' +err)
    } else {
      res.send('Sign Up Done!!');
    }
  });
}

router.post('/getReviewID', function(req, res, next) {
  var reviewData = {
      generatingReviewID: "Default"
  }
Review.create(reviewData, function (err, review) {
      if (err) {
          res.send("Error generating reviewID")
      } else {
          res.send({"reviewID":review._id})
      }
  });
});

});

module.exports = router;
