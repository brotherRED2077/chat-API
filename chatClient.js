var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
//TODO: Review https://mongoosejs.com/docs/validation.html

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

// user schema
var UserSchema = new Schema({
    id: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true, select: false },
    name: { type: String, required: true  },
    image: {type: String}
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
    var user = this;

    // hash the password only if the password has been changed or user is new
    if (!user.isModified('password')) return next();

    // generate the hash
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);

        // change the password to the hashed version
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password, callback) {
    var user = this;

    bcrypt.compare(password, user.password, function(err, isMatch) {
        callback(isMatch) ;
    });
};

// return the model
module.exports = mongoose.model('chatClient', ChatClientSchema);