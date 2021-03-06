const auth = require('../../../../middleware/auth-v2');
const users = require('../../../../../model/mongoose/users');
const Schema = require('mongoose').Schema;
const enumerations = require('../../../../../model/enumerations');
const errors = require('../../../../services/errors');
const sanitizer = require('../../../../services/sanitize');
const objects = require('../../../../services/objects');
const candidateHistoryEmail = require('../../../../services/email/emails/candidateHistory');
const filterReturnData = require('../../filterReturnData');


module.exports.request = {
    type: 'post',
    path: '/users/candidates/history'
};

const querySchema = new Schema({
    admin: Boolean,
    user_id: String
});
const bodySchema = new Schema({
    status: {
        type: String,
        enum: enumerations.candidateStatus,
    },
    reason: {
        type: String,
        enum: enumerations.statusReasons
    },
    note : String,
    email_html : String,
    email_subject: String
});

module.exports.inputValidation = {
    query: querySchema,
    body: bodySchema
};

module.exports.auth = async function (req) {
    await auth.isAdmin(req);
    if(!req.query.admin) throw new Error("User is not an admin");
}

module.exports.endpoint = async function (req, res) {
    let userId = req.query.user_id;
    let userDoc = await users.findOneById(userId);
    let sanitizedEmailHtml;
    if(userDoc) {
        let queryInput = req.body;
        let timestamp = new Date();
        let history = {
            timestamp: timestamp
        }
        let set = {};
        if(queryInput.note) {
            history.note = queryInput.note;
            if(!queryInput.status)
                set['candidate.latest_status.timestamp'] = timestamp;
        }


        if(queryInput.email_html) {
            sanitizedEmailHtml = sanitizer.sanitizeHtml(req.unsanitizedBody.email_html, true);
            history.email_html = sanitizedEmailHtml;
            if(!queryInput.status)
                set['candidate.latest_status.timestamp'] = timestamp;
        }
        if(queryInput.email_subject) history.email_subject = queryInput.email_subject;
        if(queryInput.status) {
            let status = {
                status : queryInput.status
            }
            if(queryInput.reason) status.reason = queryInput.reason;
            history.status = status;

            let latestStatus = objects.copyObject(status);
            latestStatus.timestamp = timestamp;

            set['candidate.latest_status'] = latestStatus;
        }

        if(!userDoc.first_approved_date && queryInput.status === 'approved') set.first_approved_date = timestamp;
        await users.update({_id: userId}, {
            $push: {
                'candidate.history': {
                    $each: [history],
                    $position: 0
                }
            },
            $set : set
        });

        if(queryInput.email_html && queryInput.email_subject) {
            candidateHistoryEmail.sendEmail(userDoc.email, userDoc.first_name, queryInput.email_subject, sanitizedEmailHtml, userDoc.disable_account);
        }

        userDoc = await users.findOneById(userId);
        const filterData = filterReturnData.removeSensativeData(userDoc);
        res.send(filterData);

    }
    else {
        errors.throwError("User not found", 404)
    }

}

