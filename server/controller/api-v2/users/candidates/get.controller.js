const auth = require('../../../middleware/auth-v2');
const Schema = require('mongoose').Schema;
const users = require('../../../../model/mongoose/users');
const errors = require('../../../services/errors');
const filterReturnData = require('../filterReturnData');
const companies = require('../../../../model/mongoose/companies');
const Users = require('../../../../model/mongoose/users');

module.exports.request = {
    type: 'get',
    path: '/users/candidates'
};

const querySchema = new Schema({
    admin: {
        type: String,
        enum: ['true']
    },
    user_id: String
});

module.exports.inputValidation = {
    query: querySchema
}

module.exports.auth = async function (req) {
    await auth.isLoggedIn(req);
    if (req.query.admin) await auth.isAdmin(req);
}

module.exports.endpoint = async function (req, res) {
    let userId;
    if (req.query.admin) {
        userId = req.query.user_id;
        const userDoc = await users.findByIdAndPopulate(userId);
        if(userDoc) {
            let password = true;
            if (!userDoc.password_hash) password = false;
            const filterData = filterReturnData.removeSensativeData(userDoc);
            filterData.password = password;

            if(filterData.referred_email) {
                const referredUserDoc = await Users.findOne({email: filterData.referred_email});
                if(referredUserDoc) {
                    filterData.user_id = referredUserDoc._id;
                    filterData.user_type = referredUserDoc.type;
                    if (referredUserDoc.type === 'company') {
                        const employerDoc = await
                        companies.findOne({_creator: referredUserDoc._id});
                        if (employerDoc.first_name) filterData.name = employerDoc.first_name + ' ' + employerDoc.last_name;
                    }
                    else {
                        if (referredUserDoc.first_name) filterData.name = referredUserDoc.first_name + ' ' + referredUserDoc.last_name;
                    }
                }
            }
            res.send(filterData);
        }
        else {
            errors.throwError("User not found", 404);
        }
    }
    else {
        let userId, filterData;
        if(req.auth.user.type === 'company') userId = req.query.user_id;
        else {
            const userDoc = req.auth.user;
            userId = userDoc._id;
        }
        const candidateDoc = await users.findByIdAndPopulate(userId);
        if(candidateDoc ) {
            if(req.auth.user.type === 'company'){
                filterData = await filterReturnData.candidateAsCompany(candidateDoc,req.auth.user._id);
                filterData = filterReturnData.removeSensativeData(filterData);
                res.send(filterData);
            }
            else{
                filterData = filterReturnData.removeSensativeData(candidateDoc);
                res.send(candidateDoc);
            }
        }
        else errors.throwError("Candidate account not found", 404);
    }
}