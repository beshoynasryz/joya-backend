const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  name: {
    type: String,
   
  },
  position: {
    type: String,
   
  },
  language: {
    type: String,
   
  },
  email: {
    type: String,
   
  },
  phone: {
    type: String,
    
  },
  image: {
    type: String, // This will store the image path
    required: false,
  }
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
