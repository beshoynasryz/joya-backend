const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    title :{
        type :String
    },
    paragraph :{
        type :String
    },
    image :{
        type :String
    }
},{timestamps:true}
)

module.exports = mongoose.model('services', servicesSchema)