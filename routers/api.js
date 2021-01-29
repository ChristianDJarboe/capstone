const express = require('express');
const router = express.Router();
const apiContoller = require("../controllers/api");
const { authenticate } = require('../middleware');
//universal routes
router.get("/contacts",authenticate,apiContoller.getContacts)
router.get("/thread",authenticate,apiContoller.getThread)

router.post("/createContact",authenticate,apiContoller.createContact)
router.post("/createMessage",authenticate,apiContoller.createMessage)
router.get('/user', authenticate, apiContoller.getUser);


//Brand specific routes
router.get("/campaign",authenticate,apiContoller.getCampaign)
router.get('/campaigns', authenticate, apiContoller.getCampaigns);
router.post('/create-campaign',authenticate, apiContoller.createCampaign)

router.get("/scripts",authenticate,apiContoller.getScripts)
router.get("/advertisments",authenticate,apiContoller.getAdvertisments)
router.get("/assignments",authenticate,apiContoller.getAssignments)
router.get("/audiences",authenticate,apiContoller.getAudiences)

router.post("/createScript",authenticate,apiContoller.createScript)
router.post("/createAdvertisment",authenticate,apiContoller.createAdvertisment)
router.post("/createAssignment",authenticate,apiContoller.createAdvertAssignment)
router.post("/createAudience",authenticate,apiContoller.createAudience)
router.post("/createAudienceList",authenticate,apiContoller.createAudienceList)


//influencer specific routes
router.get("/igPage",authenticate,apiContoller.getIGPage)

router.get("/followingUsers",authenticate,apiContoller.getFollowedUsers)
router.get("/userPosts",authenticate,apiContoller.getUserPosts)
router.get("/followingPosts",authenticate,apiContoller.getFollowingPosts)

router.get("/allInfluencers",authenticate,apiContoller.getAllInfluencers)

router.post("/createPost",authenticate,apiContoller.createPost);
router.post("/createFollow",authenticate,apiContoller.followUser)

module.exports = router