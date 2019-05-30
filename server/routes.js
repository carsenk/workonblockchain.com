const express = require('express');
const router = express.Router();
const multer = require('./controller/middleware/multer');
const auth = require('./controller/middleware/auth');
const asyncMiddleware = require('./controller/middleware/asyncMiddleware');

const healthCheck = require('./controller/api/healthCheck.controller');

// User authorization
const authVerifyEmail = require('./controller/api/users/auth/verifyEmail.controller');
const authForgotPassword = require('./controller/api/users/auth/forgotPassword.controller');
const authChangePassword = require('./controller/api/users/auth/changePassword.controller');
const authResetPassword = require('./controller/api/users/auth/resetPassword.controller');
const authVerifyClient = require('./controller/api/users/auth/verifyClient.controller');
const authDestroyTokenOnLogout = require('./controller/api/users/auth/destroyTokenOnLogout.controller'); //will be deleted

// Referrals
const refGetReferralCode = require('./controller/api/users/referrals/getReferralCode.controller');
const refReferral = require('./controller/api/users/referrals/referral.controller');
const getReferralCodeForUsers = require('./controller/api/users/referrals/getReferralCodeForUsers.controller');
const getReferralDetailForAdmin  = require('./controller/api/users/referrals/getReferralDetailForAdmin.controller');

// Candidates
const candidateGetAll = require('./controller/api/users/candidate/getAll.controller');
const candidateImage = require('./controller/api/users/candidate/image.controller');
const autoSuggestLocations = require('./controller/api/users/candidate/autoSuggestLocations.controller');

// Companies
const companyGet = require('./controller/api/users/company/getCompany.controller');
const companyGetCurrent = require('./controller/api/users/company/getCurrentCompany.controller');
const companyImage = require('./controller/api/users/company/image.controller');
const companySearchFilter = require('./controller/api/users/company/searchCandidates/filter.controller');
const companySearchVerifiedCandidates = require('./controller/api/users/company/searchCandidates/verifiedCandidate.controller');
const candidateVerifiedCandidateDetail = require('./controller/api/users/company/searchCandidates/getVerifiedCandidateDetail.controller');

// Chat
const updateExplanationPopupStatus = require('./controller/api/chat/updateExplanationPopupStatus.controller');

// Admin
const adminAddPrivacyContent = require('./controller/api/users/admins/pages/addPrivacyContent.controller');
const adminCandidateFilter = require('./controller/api/users/admins/candidateFilter.controller');
const adminComanyFilter = require('./controller/api/users/admins/companyFilter.controller');
const adminAddNewPagesContent = require('./controller/api/users/admins/pages/addTermsAndConditionsContent.controller');
const adminGetMetrics = require('./controller/api/users/admins/getMetrics.controller');

// Pages
const pagesGetContent = require('./controller/api/pages/getContent.controller');
const getStatistics = require('./controller/api/users/statistics.controller');

router.get('/', healthCheck);

// User authorization
router.put('/users/emailVerify/:email_hash', asyncMiddleware(authVerifyEmail)); //will be deleted
router.put('/users/forgot_password/:email', asyncMiddleware(authForgotPassword)); //will be deleted
router.put('/users/change_password',auth.isLoggedIn, asyncMiddleware(authChangePassword)); //will be deleted
router.put('/users/reset_password/:hash', asyncMiddleware(authResetPassword)); //will be deleted
router.put('/users/verify_client/:email', asyncMiddleware(authVerifyClient)); //will be deleted
router.post('/users/destroy_token', auth.isLoggedIn, asyncMiddleware(authDestroyTokenOnLogout)); //will be deleted

// Referrals
router.post('/users/send_refreal',auth.isLoggedIn, asyncMiddleware(refReferral)); //will be deleted
router.post('/users/get_refrence_code', asyncMiddleware(refGetReferralCode)); //will be deleted
router.post('/users/get_ref_code' , asyncMiddleware(getReferralCodeForUsers)); //will be deleted
router.post('/users/get_refrence_detail', auth.isLoggedIn, asyncMiddleware(getReferralDetailForAdmin)); //will be deleted


// Candidates
router.get('/users/',auth.isLoggedIn, asyncMiddleware(candidateGetAll)); // will be deleted
router.post('/users/image', auth.isLoggedIn, multer.single('photo'), asyncMiddleware(candidateImage)); // will be deleted
router.post('/users/auto_suggest/:query_input', auth.isLoggedIn , asyncMiddleware(autoSuggestLocations)); // will be deleted

// Companies
router.get('/users/company',auth.isAdmin, asyncMiddleware(companyGet)); // will be deleted
router.get('/users/current_company/:_id',auth.isLoggedIn, asyncMiddleware(companyGetCurrent)); // will be deleted
router.post('/users/employer_image',auth.isLoggedIn, multer.single('photo'), asyncMiddleware(companyImage)); // will be deleted
router.post('/users/filter',auth.isValidCompany, asyncMiddleware(companySearchFilter)); // will be deleted
router.post('/users/verified_candidate',auth.isValidCompany, asyncMiddleware(companySearchVerifiedCandidates)); // will be deleted
router.post('/users/candidate_detail',auth.isValidCompany,asyncMiddleware(candidateVerifiedCandidateDetail)); // will be deleted

// Chat
router.post('/users/updatePopupStatus', auth.isLoggedIn, asyncMiddleware(updateExplanationPopupStatus));

// Admin
router.post('/users/admin_candidate_filter', auth.isAdmin , asyncMiddleware(adminCandidateFilter)); // will be deleted
router.post('/users/admin_company_filter', auth.isAdmin , asyncMiddleware(adminComanyFilter)); // will be deleted
router.put('/users/add_privacy_content' , auth.isAdmin , asyncMiddleware(adminAddPrivacyContent)); // will be deleted
router.put('/users/add_terms_and_conditions_content' , auth.isAdmin , asyncMiddleware(adminAddNewPagesContent)); // will be deleted
router.get('/users/get_metrics', auth.isAdmin, asyncMiddleware(adminGetMetrics));

// Pages
router.get('/users/get_pages_content/:title', asyncMiddleware(pagesGetContent)); // will be deleted
router.get('/users/statistics' , asyncMiddleware(getStatistics)); // will be deleted


module.exports = router;