const User = require('../../../../model/mongoose/users');
const EmployerProfile = require('../../../../model/mongoose/company');
const jwtToken = require('../../../services/jwtToken');
const crypto = require('crypto');
const errors = require('../../../services/errors');

module.exports = async function (req, res) {

    let queryBody = req.body;
    if(queryBody.linkedin_id) {
      const userDoc =  await User.findOne({linkedin_id : queryBody.linkedin_id });
      if(userDoc) {
          let jwtUserToken = jwtToken.createJwtToken(userDoc);
          await User.update({_id: userDoc._id}, {$set: {'jwt_token': jwtUserToken}});
          const candidateDoc = await  User.findOneById( userDoc._id );
          res.send({
              _id:candidateDoc._id,
              _creator: userDoc._id, // remove this after chat refactor
              email: userDoc.email,
              email_hash: userDoc.email_hash,
              is_admin:userDoc.is_admin,
              type:userDoc.type,
              is_approved : userDoc.is_approved,
              jwt_token: jwtUserToken
          });
      }
      else {
          errors.throwError("User not found" , 404)
      }

    }

    else
    {
        let userDoc =  await User.findOneByEmail( queryBody.email);
        if(userDoc) {
            let hash = crypto.createHmac('sha512', userDoc.salt);
            hash.update(queryBody.password);
            let hashedPasswordAndSalt = hash.digest('hex');

            if (hashedPasswordAndSalt === userDoc.password_hash)
            {
                if(userDoc.type === 'candidate') {
                    let jwtUserToken = jwtToken.createJwtToken(userDoc);
                    await User.update({_id: userDoc._id}, {$set: {'jwt_token': jwtUserToken}});
                    res.send({
                        _id: userDoc._id,
                        _creator : userDoc._id, // remove this after chat refactor
                        email: userDoc.email,
                        email_hash: userDoc.email_hash,
                        is_admin: userDoc.is_admin,
                        type: userDoc.type,
                        is_approved: userDoc.is_approved,
                        jwt_token: jwtUserToken
                    });
                }

                if(userDoc.type === 'company') {
                    let jwtUserToken = jwtToken.createJwtToken(userDoc);
                    await User.update({_id: userDoc._id}, {$set: {'jwt_token': jwtUserToken}});
                    const companyDoc = await EmployerProfile.findOne({ _creator:  userDoc._id });
                    res.send({
                        _id: companyDoc._id,
                        _creator: userDoc._id,
                        email: userDoc.email,
                        email_hash: userDoc.email_hash,
                        is_admin: userDoc.is_admin,
                        type: userDoc.type,
                        is_approved: userDoc.is_approved,
                        jwt_token: jwtUserToken,
                        created_date : userDoc.created_date
                    });
                }

            }
            else
            {
                errors.throwError("Incorrect Password" , 400)
            }

        }
        else {
            errors.throwError("User not found" , 404)
        }

    }

}

