import mongoose from "mongoose"

const quoteschema= new mongoose.Schema({
    quote:{
        type:String,
        required:true
    },
    author:{
        type:String
    },
    authorID:{
        type:String
    }

})
const Quote = mongoose.model('Quote', quoteschema);

export default Quote;
