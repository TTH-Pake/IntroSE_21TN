var express = require('express');
var router = express.Router();
const userController = require('./../controllers/userController')
// trang đăng nhập
router.get('/signup', function (req, res, next) {
    res.render('user/signup')
});
router.post('/signup', userController.signup)
// trang tạo tài khoản mới
router.get('/signin', function (req, res, next) {
    res.render('user/signin')
});
router.post('/signin', userController.signin)
// trang cá nhân
router.get('/:slug', (req, res) => {
    const userSlug = req.params.slug; 
    res.send(`The slug is: ${userSlug}`);
});

module.exports = router;