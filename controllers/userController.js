var express = require('express');
var userAccount= require('./../modules/mongo')
class userController{
    async signin(req, res){
        const data = req.body
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
    }
    async signup(req, res){
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
    }
}
module.exports = new userController