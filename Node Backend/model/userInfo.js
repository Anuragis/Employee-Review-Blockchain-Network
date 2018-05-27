var mongoose = require('mongoose');
var bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  ID: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  }
},
{collection: 'users'});

UserSchema.pre('save', function (next) {
	var user = this;
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function (err, hash) {
			if(err) return next(err);

			user.password = hash;
			next();
		});
	});
});

UserSchema.statics.authenticate = function (ID, password, callback) {
   User.findOne({ ID: ID })
     .exec(function (err, user) {
       if (err) {
         return callback(err)
       } else if (!user) {
         var err = new Error('User not found.');
         err.status = 401;
         return callback(err);
       }
       bcrypt.compare(password, user.password, function (err, result) {
         if (result === true) {
           return callback(null, user);
         } else {
           return callback();
         }
       })
     });
 }


var User = mongoose.model('User', UserSchema);
module.exports = User;
