const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['offplan', 'feature', 'luxury'], // Enum for property type
    
    },  
    imageProperty: {
      type: String, // Store image URL or path for the property image
    },
   
    description: {
      type: String,
    
    },
    location: {
      type: String,
    
    },
    price: {
      type: String,
    
    },
    beds: {
      type: String,
    
    },
    bathrooms: {
      type: String,
    
    },
    space: {
      type: String, // Space in square meters or feet
    
    },
    paymentPlan: {
      type: String, // Can be a string like "installment" or "full payment"
    },
    locationDetails: {
      type: String,
    },
    startingPrice: {
      type: String, // For pricing starting range
    },
    bookingFees: {
      type: String, // Deposit or booking fees
    },
    handoverDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);

