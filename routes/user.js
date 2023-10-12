var express = require('express');
var router = express.Router();
var userAccountCollection= require('.././models/mongo')
// trang đăng nhập
router.get('/signup', function (req, res, next) {
    res.render('user/signup')
});
router.post('/signup', async (req, res) => {
    const data = {
        username : req.body.username,
        password : req.body.password,
    }
    const user = await userAccountCollection.findOne({ username: data.username})
    try{
        if (user) {
            res.send("Tài khoản đã tồn tại")
        }
        else{
            userAccountCollection.insertMany([data])
            res.send("Tài khoản được tạo thành công")
        }
    }
    catch (error){
        console.error(error)
        res.send("wrong inputs")
    }
    res.status(201)
})
// trang tạo tài khoản mới
router.get('/signin', function (req, res, next) {
    res.render('user/signin')
});
router.post('/signin', async (req, res) => {
    const data = {
        username : req.body.username,
        password : req.body.password
    }
    const user = await userAccountCollection.findOne(data)
    try {
        if (user){
            console.log(user)
            res.send("Đăng nhập thành công")
        }
        else {
            res.send("Tài khoản không tồn tại hoặc sai mật khẩu")
        }
    }
    catch (error){
        console.error(error)
    }
    res.status(201)
})
module.exports = router;
