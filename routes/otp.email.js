const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otp.controller');

router.post('/email/otp/send', otpController.sendOtp);
router.post('/email/otp/verify', otpController.verifyOtp);

module.exports = router;
