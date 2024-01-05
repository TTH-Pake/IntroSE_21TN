const express = require("express");
const router = express.Router();
const accountController = require("../controller/account");

router.post("/login", accountController.loginControl);
// router.post("/register", accountController.registerControl);
router.post("/register", accountController.registerWithVerificationControl);
router.post("/register/verify", accountController.verifyAccountControl);
router.post("/forgotPassword", accountController.forgotPasswordControl);
router.get(
  "/forgotPassword/verify/:code",
  accountController.verifyForgotPasswordControl
);

// router.post(
//   "/api/sendVerificationCode",
//   accountController.sendVerificationCodeControl
// );
// router.post("/changePassword", accountController.changePasswordControl);
// router.put("/resetPassword", accountController.resetPasswordControl);
// router.post("/login/google", accountController.loginWithGoogleControl);
// router.post("/login/facebook", accountController.loginWithFacebookControl);

module.exports = router;
