const express = require('express');
const { ProfileNameUpdate, profilePasswordUpdate, validatePassword } = require('../controllers/ProfileController');
const auth = require('../utils/auth');
const router = express.Router();
//updateName
router.post('/updateName', auth, ProfileNameUpdate);
//updatePassword
router.post('/updatePassword', [auth, validatePassword], profilePasswordUpdate)
module.exports = router;