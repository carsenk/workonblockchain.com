const chai = require('chai');
const chaiHttp = require('chai-http');
const crypto = require('crypto');
const server = require('../../../../server');
const mongo = require('../../../helpers/mongo');
const Users = require('../../../../model/users');
const Companies = require('../../../../model/employer_profile');
const companyHepler = require('../company/companyHelpers');
const candidateHepler = require('../candidate/candidateHelpers');
const authenticateHepler = require('./authenticateHelpers');
const docGenerator = require('../../../helpers/docGenerator');

const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe('account setting' , function () {

    afterEach(async () => {
        console.log('dropping database');
        await mongo.drop();
    })

    describe('POST /users/account_settings' , () => {

        it('it should enable or disbale the account setting' , async() => {

            const company = docGenerator.company();
            const companyRes = await companyHepler.signupCompany(company);

            let userDoc = await Users.findOne({email: company.email}).lean();
            userDoc.disable_account.should.equal(false);

            const disbaleSetting = docGenerator.accountSetting();
            const accountSetting = await authenticateHepler.accountSetting(disbaleSetting, userDoc.jwt_token);

            userDoc = await Users.findOne({email: company.email}).lean();
            userDoc.disable_account.should.equal(true);
        })
    })
})