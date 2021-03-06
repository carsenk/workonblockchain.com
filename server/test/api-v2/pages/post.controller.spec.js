const chai = require('chai');
const chaiHttp = require('chai-http');
const mongo = require('../../helpers/mongo');
const users = require('../../../model/mongoose/users');
const pages = require('../../../model/mongoose/pages');
const docGenerator = require('../../helpers/docGenerator');
const companyHelper = require('../otherHelpers/companyHelpers');
const pagesHelper = require('./pagesHelpers');

const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe('POST /pages', function () {

    afterEach(async function () {
        console.log('dropping database');
        this.timeout(1000);
        await mongo.drop();
    })

    describe('authorization and control', function () {
        it('it should insert html data in db', async function () {
            const company = docGenerator.company();
            await companyHelper.signupAdminCompany(company);
            const companyDoc = await users.findOne({email: company.email});

            const info = docGenerator.cmsContent();
            const cmsRes = await pagesHelper.addPages(info , companyDoc.jwt_token);

            const pageContent = await pages.findOne({page_name : info.name});
            pageContent.page_title.should.equal(info.title);
            pageContent.page_content.should.equal(info.content);
        })

    });
});