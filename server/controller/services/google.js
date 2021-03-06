const settings = require('../../settings');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const errors = require('./errors');

module.exports.googleAuth = async function (googleCode) {
    const googleConfig = settings.googleCredentials;
    const oauth = new OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirectUrl
    );
    const plus = google.plus('v1');
    const data = await getGoogleAccountFromCode(googleCode, oauth, plus);
    return data;

}

async function getGoogleAccountFromCode(googleCode, oauth, plus) {
    try {
        const {tokens} = await oauth.getToken(googleCode);
        // add the tokens to the google api so we have access to the account
        oauth.setCredentials(tokens);

        const response = await plus.people.get({userId: 'me', auth: oauth});
        const emailAddress = response.data.emails[0].value;
        return {
            email: emailAddress,
            google_id: response.data.id,
            first_name: response.data.name.familyName,
            last_name: response.data.name.givenName
        }
    }
    catch (error) {
        if(error.message === 'invalid_grant') {
            errors.throwError("This authorization code has already been used, please log in or sign up again.", 400);
        }
        else throw new Error(error)
    }
}