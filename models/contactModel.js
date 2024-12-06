const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    description :{
        type :String,
    },
    mapUrl :{
        type :String,
    },
    phone :{
        type :String,
    },
    email :{
        type :String,
    },
    facebook :{
        type :String,
    },
    instagram :{
        type :String,
    },
    twitter :{
        type :String,
    },
    linkedin :{
        type :String,
    }
},{timestamps:true})
module.exports = mongoose.model('ContactUs',contactSchema)