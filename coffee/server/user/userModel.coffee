mongoose = require("mongoose")
crypto = require("crypto")
Schema = mongoose.Schema

setPass = (value) ->
  salt = "anyRandomSaltValue"
  @set "salt", salt
  pass = hashPass(value + salt)
  pass

hashPass = (value) ->
  crypto.createHash("sha1").update(value).digest "HEX"

userSchema = new Schema
  name:
    type: String
    required: true
  email:
    type: String
    required: true
    unique: true
  pass:
    type: String
    required: true
    set: setPass
  salt:
    type: String
    required: true

userSchema.method validatePass: (senha) ->
  salt = @get("salt")
  passSha = hashPass(senha + salt)
  passSha is @get("senha")

userSchema.static findByEmail: (email, success, error) ->
  @findOne
    email: email
  , (e, o) ->
    if e
      error e  if error
    else
      success o  if success

module.exports = mongoose.model("User", userSchema)