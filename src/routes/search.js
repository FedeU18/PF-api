const { Router } = require("express");
const{getSimilitudes,getAllUsernames}=require('../controllers/Search')
const router = Router();
router.get("/", getSimilitudes);
router.get("/all",getAllUsernames)

module.exports = router;