var express = require('express');
var router = express.Router();
var userAccount= require('.././models/mongo')
// trang đăng nhập
router.get('/signup', function (req, res, next) {
    res.render('user/signup')
});
router.post('/signup', async (req, res) => {
    const data = req.body
    try {
        const user = await userAccount.findOne({ username: data.username})
        if (user) {
            res.send('Tài khoản đã tồn tại')
        }
        else{
            const newUser = new userAccount(data)
            await newUser.save();
            res.redirect(`${req.baseUrl}/${newUser.slug}`);
        }
    }
    catch (error){
        console.error(error)
        res.send('wrong inputs')
    }
})
// trang tạo tài khoản mới
router.get('/signin', function (req, res, next) {
    res.render('user/signin')
});
router.post('/signin', async (req, res) => {
    const data = {
        username : req.body.username,
        password : req.body.password,
        
    }
    try {
        const user = await userAccount.findOne(data)
        if (user){
            console.log(req.baseUrl)
            res.redirect(`${req.baseUrl}/${user.slug}`);
        }
        else {
            res.send('Tài khoản không tồn tại hoặc sai mật khẩu')
        }
    }
    catch (error){
        console.error(error)
    }
    
})
// trang cá nhân
router.get('/:slug', (req, res) => {
    const userSlug = req.params.slug; 
    res.send(`The slug is: ${userSlug}`);
});

module.exports = router;