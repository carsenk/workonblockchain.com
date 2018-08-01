const emails = require('../emails');
const settings = require('../../../../settings');

module.exports.sendEmail = function sendEmail(data,first_name) {
    const verifyEmailUrl = settings.CLIENT.URL + 'verify_email?email_hash='+data.token;
    const sendTo = {
        email: data.email
    };
    const subject = "Please verify your email on Work on Blockchain";

    const sendToArray = [sendTo];

    const mandrillOptions = {
        templateName: "wob-verify-email",
        message: {
        	 global_merge_vars: [
  				{FNAME : first_name},
  				{VERIFY_EMAIL_URL   : verifyEmailUrl}
  			],
            subject: subject,
            to: sendToArray
        }
    };

	emails.sendEmail(mandrillOptions);
}