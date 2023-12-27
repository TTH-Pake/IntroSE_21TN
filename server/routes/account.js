const express = require("express");
const router = express.Router();
const accountController = require("../controller/account");

router.post("/login", accountController.loginControl);
// router.post("/register", accountController.registerControl);
router.post("/register", accountController.registerWithVerificationControl);
router.get("/verify/:code", accountController.confirmEmailControl);
// router.post(
//   "/api/sendVerificationCode",
//   accountController.sendVerificationCodeControl
// );
router.post("/changePassword", accountController.changePasswordControl);
router.put("/resetPassword", accountController.resetPasswordControl);
router.post("/login/google", accountController.loginWithGoogleControl);
// router.post("/login/facebook", accountController.loginWithFacebookControl);

module.exports = router;
