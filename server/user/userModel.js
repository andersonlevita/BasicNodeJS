var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var setPass = function(value) {
        var salt = 'anyRandomSaltValue';
        this.set('salt', salt);
        var pass = hashPass(value + salt);
        return pass;
    }

var hashPass = function(value) {
        return crypto.createHash('sha1').update(value).digest('HEX');
    }

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true,
        set: setPass
    },
    salt: {
        type: String,
        required: true
    }
});

userSchema.method({
    validatePass: function(senha) {
        var salt = this.get('salt');
        var passSha = hashPass(senha + salt);
        return passSha === this.get('senha');
    },
});

userSchema.static({
    findByEmail: function(email, success, error) {
        this.findOne({
            email: email
        }, function(e, o) {
            if(e) {
                if(error) error(e);
            } else {
                if(success) success(o);
            }
        });
    },
});

module.exports = mongoose.model("User", userSchema);