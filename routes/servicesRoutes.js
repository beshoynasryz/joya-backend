const express = require('express')
const router = express.Router()
const {
    cerateService,
    getAllServices,
    updateService,
    deleteService
} = require('../controllers/servicesController')
const upload = require('../middleware/upload')

router.route('/')
.get(getAllServices)
.post(upload.single('image'), cerateService)

router.route('/:id')
    .put(upload.single('image'), updateService)
    .delete(deleteService)
    
module.exports = router;

