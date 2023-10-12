const mongoose=require("mongoose")

mongoose.connect('mongodb+srv://admin:1234@cluster0.sxjgbwj.mongodb.net/NMCNPM', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const userAccountSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const userAccountCollection=new mongoose.model('useraccount', userAccountSchema)

module.exports=userAccountCollection