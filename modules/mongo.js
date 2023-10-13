const mongoose=require("mongoose")
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug)
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://admin:1234@cluster0.sxjgbwj.mongodb.net/NMCNPM', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const userAccountSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    fullname:{
        type: String,
        required: true,
    },
    slug: {
        type: String, 
        slug: 'fullname', 
        unique: true,
    },
})

const userAccount=new mongoose.model('useraccount', userAccountSchema)

module.exports=userAccount