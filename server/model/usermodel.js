import mongoose from "mongoose"

const userschema = new mongoose.Schema({
    username :{
        type: String,
        required:true
    },
    emailId :{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:15
    }
})

const User = mongoose.model('User',userschema);
export default User;