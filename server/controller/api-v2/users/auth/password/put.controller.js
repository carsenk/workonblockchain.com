const users = require('../../../../../model/mongoose/users');
const errors = require('../../../../services/errors');
const crypto = require('../../../../services/crypto');
const auth = require('../../../../middleware/auth-v2');
const Schema = require('mongoose').Schema;

module.exports.request = {
    type: 'put',
    path: '/users/auth/password'
};

const bodySchema = new Schema({
    current_password: String,
    new_password: String
});

module.exports.inputValidation = {
    body: bodySchema
};

module.exports.auth = async function (req) {
    await auth.isLoggedIn(req);
}

module.exports.endpoint = async function (req, res) {
    let userId = req.auth.user._id;
    const userDoc = req.auth.user;
    let queryBody = req.body;
    let hashedPasswordAndSalt = crypto.createPasswordHash(queryBody.current_password, userDoc.salt)

    if (hashedPasswordAndSalt === userDoc.password_hash) {
        const salt = crypto.getRandomString(128);
        const hashedPasswordAndSalt = crypto.createPasswordHash(queryBody.new_password, salt);

        await users.update({ _id: userId },{ $set: {'password_hash': hashedPasswordAndSalt, 'salt' : salt } });
        res.send({
            success : true
        })
    }
    else  errors.throwError("Current password is incorrect", 400);
}