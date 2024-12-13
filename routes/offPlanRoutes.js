const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createOffPlan, getAllOffPlans, getOffPlanById, updateOffPlan, deleteOffPlan } = require("../controllers/OffPlanController");

// Route to create a new OffPlan
router.post("/", upload.fields([
    { name: 'imgSrcs', maxCount: 10 }
  ]), createOffPlan);

// Route to get all OffPlans
router.get("/", getAllOffPlans);

// Route to get a single OffPlan by ID
router.get("/:id", getOffPlanById);

// Route to update an OffPlan
router.put("/:id", upload.fields([
    { name: 'imgSrcs', maxCount: 10 }
  ]), updateOffPlan);

// Route to delete an OffPlan
router.delete("/:id", deleteOffPlan);

module.exports = router;
