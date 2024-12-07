const asyncHandler = require('express-async-handler')
const services = require("../models/servicesModel")

//create a new service
const cerateService = asyncHandler(async(req,res)=>{
    const {title, paragraph } = req.body
    const image = req.file ? `/images/${req.file.filename}`: null;
    const service = await services.create({title, paragraph, image})
    res.status(201).json({message:'success',service:service})

})
//get all services
const getAllServices = asyncHandler(async (req, res) => {
    const serviceList = await services.find();
    res.status(200).json(serviceList);
  });

//update a service
const updateService = asyncHandler(async(req,res)=>{
    const {title, paragraph} = req.body
    const image = req.file ? `/images/${req.file.filename}` : null;
    const service = await services.findById(req.params.id)
    if(!service){ 
       throw new Error(`Service not found`);
    }

    service.title = title || service.title;
    service.paragrah = paragraph || service.paragraph;
    service.image = image || service.image;

    const updateService = await service.save()
    res.status(200).json(updateService)
})
// delete service

const deleteService = asyncHandler(async(req,res)=>{
    const service = await services.findById(req.params.id)
    if(!service){ 
       throw new Error(`Service not found`);
    }
    await services.findByIdAndDelete(req.params.id)
    res.status(200).json({message:'Service deleted successfully'})
})

module.exports = {
    cerateService,
    getAllServices,
    updateService,
    deleteService
}
