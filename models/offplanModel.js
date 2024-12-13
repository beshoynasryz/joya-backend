const mongoose =require("mongoose");

const OffPlanShema=mongoose.Schema({

    title:{
        type:String,
       
    },
    description:{
        type:String

    },
    details:String,
    imgSrcs: {
        type: [String],  // This defines imgSrcs as an array of strings
       
      },
    PaymentPlan:String,



    StartingPrice:Number,
    HandoverDate:Number,
    Bookingfees:Number,
    Bedrooms: {
        type: [Number],  // This ensures Bedrooms is an array of numbers
        required: true,
      },
ExpoCity:Number,
MarinaWalk:Number,
DubaiInternationalAirport:Number,
DowntownDubai:Number,
location:String

})

const OffPlanModel=mongoose.model("offplan",OffPlanShema)

module.exports=OffPlanModel;